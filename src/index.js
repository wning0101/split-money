import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Member from './member'
import Spend from './spend'
import Payer from './payer'
import Sharer from './sharer'
import Settle from './settle'
import {
    Stitch,
    UserPasswordCredential,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";

// import * as serviceWorker from './serviceWorker';


class Note extends React.Component {
    constructor(){
        super()
        this.state = {
            owner: "willylin0607@gmail.com",
            password: "1qaz2wsx",
            number: 0,
            total_spend: 0,
            members: [],
            result: [],
            record : [],
            each_spend : {},
            each_share : {},
        }
        this.add_member = this.add_member.bind(this)
        this.add_spending = this.add_spending.bind(this)
        this.settle = this.settle.bind(this)
        this.displayTodos = this.displayTodos.bind(this)
    }
    

    componentDidMount() {
        // Initialize the App Client
        this.client = Stitch.initializeDefaultAppClient("split-money-filxi");
        const mongodb = this.client.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        this.db = mongodb.db("SP");
        this.displayOnLoad();
        // this.displayTodos();
    }

    displayOnLoad() {
        this.client.auth
          .loginWithCredential(new UserPasswordCredential(this.state.owner, this.state.password))
          .then(this.displayTodos)
          .catch(console.error);
    }

    displayTodos() {
        this.db
            .collection("SP")
            .findOne({owner_id: this.client.auth.user.id})
            .then( result => { 
                // var myJSON = JSON.stringify(result.data);
                // alert(myJSON)
                this.setState({
                    owner: result.data.owner,
                    password: result.data.password,
                    number: result.data.number,
                    total_spend: result.data.total_spend,
                    members: result.data.members,
                    result: result.data.result,
                    record : result.data.record,
                    each_spend : result.data.each_spend,
                    each_share : result.data.each_share,
                })
                return result});
    }
    update_data() {
        this.db.collection("SP").updateOne(
            {owner_id: this.client.auth.user.id},
            {$set: {data: this.state} }
        )
        // if (!check) {
            // this.db
            // .collection("SP")
            // .insertOne({
            // owner_id: this.client.auth.user.id,
            // data: [this.state]
            // })
            // .then();
        // }
        // else {
        //     this.db.collection("SP").update(
        //         {owner_id: this.client.auth.user.id},
        //         { $set: { data: this.state } },
        //         { multi: false }
        //     )
        // }
    }
    

    add_member = () => {
        var new_each_spend = this.state.each_spend;
        var new_each_share = this.state.each_share;
        var new_members = this.state.members;
        var input = String(document.getElementById("name").value);
        if (input == "") {
            alert("Please don't enter empty name")
            return;
        }
        if (this.state.members.includes(input)) {
            alert(input + " already exists");
            return;
        }
        new_members.push(input);
        new_each_spend[input] = Number(0);
        new_each_share[input] = Number(0);
        this.setState({
            number : this.state.number+1,
            members : new_members,
            each_spend : new_each_spend,
            each_share : new_each_share, 
        });
        this.update_data()
    }
    // Don't use add_spending()
    add_spending = () => {
        var pay = String(document.getElementById("payer").value);
        var amount = document.getElementById("amount").value;
        if (amount<=0){
            alert("The amount can't be equal or less than zero.")
            return;
        }
        var sharer = []
        var i = 0
        for (i=0;i<this.state.members.length;i++){
            if (document.getElementById(String(this.state.members[i])).checked == true){
                sharer.push(this.state.members[i]);
            }
        }
        var share_number = sharer.length;
        if (share_number == 0){
            alert("There's no sharer.")
            return;
        }
        var cur_share = this.state.each_share;
        var cur_spend = this.state.each_spend;
        cur_spend[pay] = Number(cur_spend[pay]) + Number(amount);
        for (i=0;i<share_number;i++){
            cur_share[sharer[i]] += amount/share_number;
        }
        var cur_record = this.state.record;
        
        cur_record.push([pay, amount, sharer])
        this.setState({
            total_spend : this.state.total_spend + amount,
            each_share : cur_share,
            each_spend : cur_spend,
            record : cur_record
        })

        this.settle();
        this.update_data()
        return;
    }

    settle() {
        var pos = [];
        var neg = [];
        var equ = [];
        var record = [];
        var i = 0;
        for(i=0; i < this.state.members.length;i++){
            var name = this.state.members[i];
            var balance = this.state.each_spend[name] - this.state.each_share[name];
            if (balance>0){
                pos.push([balance, name]);
            }
            else if (balance<0){
                neg.push([balance, name]);
            }
            else{
                equ.push([0, name]);
            }
        }
        function compare(a, b) {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        }
        function compare2(a, b) {
            if (a[0] < b[0]) return 1;
            if (a[0] > b[0]) return -1;
            return 0;
        }
        pos = pos.sort(compare);
        neg = neg.sort(compare2);
        var temp = [];
        while(pos.length > 0 && neg.length > 0 ){
            var transfer = pos[0][0] + neg[0][0];
            if (transfer>0){
                record.push([neg[0][1], pos[0][1], -neg[0][0]]);
                pos[0][0] += neg[0][0];
                temp = [pos[0][0], pos[0][1]];
                pos.shift();
                neg.shift();
                pos.push(temp);
                pos = pos.sort(compare)
            }
            else if(transfer<0){
                record.push([neg[0][1], pos[0][1], pos[0][0]]);
                neg[0][0] += pos[0][0];
                temp = [neg[0][0], neg[0][1]];
                pos.shift();
                neg.shift();
                neg.push(temp);
                neg = neg.sort(compare2);
            }
            else{
                record.push([neg[0][1], pos[0][1], pos[0][0]]);
                pos.shift();
                neg.shift();
            }
        }
        this.setState({
            result: record,
        })
        return;
    }
    
    // build the html
    render() {
        let Members = this.state.members.map(item => <Member key={item} name={item} balance={this.state.each_spend[item] - this.state.each_share[item]}/>)
        let Spends = this.state.record.map(item => <Spend key={item} pay={item[0]} amount={item[1]} share={item[2]} />)
        let Payers = this.state.members.map(item => <Payer key={item} name={item}/>)
        let Sharers = this.state.members.map(item => <Sharer key={item} name={item}/>)
        let Settles = this.state.result.map(item => <Settle key={item} give={item[0]} recieve={item[1]} amount={item[2]}/>)
        return(
        <>
            <div class="row">
                <div class="col-sm-4">
                    <a>Add a new member: </a>
                    <input id="name"></input>
                    <button onClick= {this.add_member}>Add</button><br/>
                </div>
                <div class="col-sm-4">
                    <a>Add a new spending</a>
                    <br/>
                    Subject: <br/>
                    <input id="subject"></input> <br/>
                    Payer: 
                    <select id="payer">
                        {Payers}
                    </select> <br/>
                </div>
                <div class="col-sm-4">
                    <a> </a><br/>
                    Sharer: 
                    <div id="sharer">
                        {Sharers}
                    </div>
                    Amount: 
                    <input id="amount"></input>
                    <br/>
                    <button onClick= {this.add_spending}>Add</button><br/>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <a> Members: </a>
                    <div> {Members} </div>
                </div>
                <div class="col-sm-4">
                    <a> Spending Record: </a>
                    <div> {Spends}</div>
                </div>
                <div class="col-sm-4">
                    <a> Final Settle: </a>
                    <div> {Settles}</div>
                </div>
            </div>
        </>
        );
    }
}


ReactDOM.render( <Note /> , document.getElementById('note'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
