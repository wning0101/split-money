import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Member from './member'
import Spend from './spend'
import Payer from './payer'
import Sharer from './sharer'
import Settle from './settle'
// import * as serviceWorker from './serviceWorker';

function Manipulate(props) {
    return(
        <button onClick={props.event}> {props.value} </button>
    );
}

class Note extends React.Component {
    constructor(){
        super()
        this.state = {
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
                // record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(-neg[0][0]) + " dollars.");
                record.push([neg[0][1], pos[0][1], -neg[0][0]]);
                pos[0][0] += neg[0][0];
                temp = [pos[0][0], pos[0][1]];
                pos.shift();
                neg.shift();
                pos.push(temp);
                pos = pos.sort(compare)
            }
            else if(transfer<0){
                // record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(pos[0][0]) + " dollars.");
                record.push([neg[0][1], pos[0][1], pos[0][0]]);
                neg[0][0] += pos[0][0];
                temp = [neg[0][0], neg[0][1]];
                pos.shift();
                neg.shift();
                neg.push(temp);
                neg = neg.sort(compare2);
            }
            else{
                // record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(pos[0][0]) + " dollars.");
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
        <a>Add a new member: </a>
        <input id="name"></input>
        <button onClick= {this.add_member}>Add</button><br/>
        <a>Add a new spending</a> <br/>
        <div class="spending">
        <a>Payer: </a>
        <select id="payer">
            {Payers}
        </select> <br/>  
        <a>Sharer: </a>
        <div id="sharer">
            {Sharers}
        </div>
        <a>Amount: </a>
        <input id="amount"></input>
        <br/>
        <button onClick= {this.add_spending}>Add</button><br/>
        </div>
        <br/>
        <div> Members: </div>
        <div> {Members} </div>
        <div> Spending Record: </div>
        <div> {Spends}</div>
        <div> Final Settle: </div>
        <div> {Settles}</div>
        </>
        );
    }
}


ReactDOM.render( <Note /> , document.getElementById('note'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
