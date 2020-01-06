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
        var input = document.getElementById("name").value;
        if (this.state.members.includes(String(input))) {
            alert(input + " already exists");
            return;
        }
        new_members.push(String(input));
        new_each_spend[String(input)] = 0;
        new_each_share[String(input)] = 0;
        this.setState({
            number : this.state.number+1,
            members : new_members,
            each_spend : new_each_spend,
            each_share : new_each_share, 
        });
        
        var myJSON = JSON.stringify(this.state.members);
        document.getElementById("member").innerHTML = "Member: " + myJSON;
    }
    
    add_spending(payer, sharer, amount) {
        return;
    }

    settle() {
        return;
    }
    
    render() {
        return(
        <>
        <input id="name"></input>
        <button onClick= {this.add_member}>Add a new member</button>
        <div id="member"> Member: {this.state.members} </div>
        <div> Final settle: {this.state.result}</div>
        <div> spending record: {this.state.record} </div>
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
