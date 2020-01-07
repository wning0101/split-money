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
        result: "qweqw",
        record : [<li>172</li>, <li>412</li>, <li>312</li>],
        each_spend : {},
        each_share : {}
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
    
    add_spending() {
        var pay = String(document.getElementById("payer").value);
        var amount = document.getElementById("amount");
        var sharer = []
        var i = 0
        for (i=0;i<this.state.members.length;i++){
            if (document.getElementById(String(this.state.members[i]).checked == true)){
                share.push(this.state.members[i]);
            }
        }
        
        this.setState({
            total_spend : this.state.total_spend + amount
        })

        
        return;
    }

    settle() {
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
        <div> spending record: {this.state.record} </div>
        <div> Final settle: {this.state.result}</div>
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
