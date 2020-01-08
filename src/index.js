import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';

function Manipulate(props) {
    return(
        <button onClick={props.event}> {props.value} </button>
    );
}

class Note extends React.Component {
    state = {
        number: 0,
        total_spend: 0,
        members: [],
        result: [],
        record : [],
        each_spend : {},
        each_share : {},
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
        new_each_spend[input] = 0;
        new_each_share[input] = 0;
        this.setState({
            number : this.state.number+1,
            members : new_members,
            each_spend : new_each_spend,
            each_share : new_each_share, 
        });
        
        var myJSON = JSON.stringify(this.state.members);
        document.getElementById("member").innerHTML = "Member: " + myJSON;
        document.getElementById("sharer").innerHTML = "";
        document.getElementById("payer").innerHTML = "";
        var i = 0
        for (i=0; i<this.state.members.length;i++) {
            document.getElementById("payer").innerHTML += "<option value='" + this.state.members[i] + "'>" + this.state.members[i] + "</option>";
        }
        for (i=0; i<this.state.members.length;i++) {
            document.getElementById("sharer").innerHTML += "<input id='" + this.state.members[i] + "' type='checkbox'/>" + this.state.members[i] + "<br/>";
        }

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
        cur_spend[pay] += amount;
        for (i=0;i<share_number;i++){
            cur_share[sharer[i]] += amount/share_number;
        }
        var cur_record = this.state.record;
        var myJSON = JSON.stringify(sharer);
        cur_record.push("<li>" + pay + " paid $" + String(amount) + " for " + myJSON + "</li>")
        this.setState({
            total_spend : this.state.total_spend + amount,
            each_share : cur_share,
            each_spend : cur_spend,
            record : cur_record
        })
        document.getElementById("record").innerHTML = "Spending record: "
        for(i=0;i<this.state.record.length;i++){
            document.getElementById("record").innerHTML += this.state.record[i];
        }
        this.settle();
        document.getElementById("result").innerHTML = "Final settle: <br>"
        for(i=0;i<this.state.result.length;i++){
            document.getElementById("result").innerHTML += "<li>" + this.state.result[i] + "</li>";
        }

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
        var temp = 0;
        while(pos.length > 0 && neg.length > 0 ){
            var transfer = pos[0][0] + neg[0][0];
            if (transfer>0){
                record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(neg[0][0]) + " dollars.");
                pos[0][0] += neg[0][0];
                temp = pos[0][0];
                pos.shift();
                neg.shift();
                pos.push(temp);
                pos = pos.sort(compare)
            }
            else if(transfer<0){
                record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(pos[0][0]) + " dollars.");
                neg[0][0] += pos[0][0];
                temp = neg[0][0];
                pos.shift();
                neg.shift();
                neg.push(temp);
                neg = neg.sort(compare2);
            }
            else{
                record.push(neg[0][1] + " gives " + pos[0][1] + " " + String(pos[0][0]) + " dollars.");
                pos.shift();
                neg.shift();
            }
        }
        this.setState({
            result: record,
        })

        return;
    }
    
    render() {
        return(
        <>
        <a>Add a new member: </a>
        <input id="name"></input>
        <button onClick= {this.add_member}>Add</button><br/>
        <a>Add a new spending</a> <br/>
        <div class="spending">
        <a>Payer: </a>
        <select id="payer">
            {/* <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="vw">VW</option>
            <option value="audi" selected>Audi</option> */}
        </select> <br/>  
        <a>Sharer: </a>
        <div id="sharer">
            {/* <input type="checkbox" value="Bike"/> I have a bike<br/>
            <input type="checkbox" value="Car"/> I have a car<br/>
            <input type="checkbox" value="Boat"/> I have a boat<br/> */}
        </div>
        <a>Amount: </a>
        <input id="amount"></input>
        <br/>
        <button onClick= {this.add_spending}>Add</button><br/>
        </div>
        <br/>
        <div id="member"> Member: {this.state.members} </div>
        <div id="record"> spending record: {this.state.record} </div>
        <div id="result"> Final settle: {this.state.result}</div>
        </>
        );
    }
}

class Platform extends React.Component {
    render() {
        
        return(
        <>    
        <div>Here is Platform</div> 
        </>
        );
    }
  }
  
class History extends React.Component {
    render() {
        return(<div>Here is History</div> );
    }
}

class Result extends React.Component {
    render() {
        return(<div>Here is Result</div> );
    }
}
  
// ReactDOM.render( <Platform /> , document.getElementById('platform'));
// ReactDOM.render( <History /> , document.getElementById('history'));
// ReactDOM.render( <Result /> , document.getElementById('result'));
ReactDOM.render( <Note /> , document.getElementById('note'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
