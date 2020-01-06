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
    constructor(props) {
        super(props);
        this.trip_name = null;
        this.owner = null;
        this.number = "123123";
        this.total_spend = 0;
        this.record = [<li>172</li>, <li>412</li>, <li>312</li>];
        this.members = [];
        this.result = "asdjhksahkj";
        this.each_spend = {
        };
        this.each_share = {
        };

    }
    add_member(name) {
        this.number += 1;
        this.members.push(name + " ")
        this.each_spend[name] = 0;
        this.each_share[name] = 0;
        return;
    }
    
    add_spending(payer, sharer, amount) {
        return;
    }

    settle() {
        return;
    }

    create_button(name) {
        const func_name = {"addmember": this.add_member(),
                           "spending": this.add_spending(),
                           "result": this.settle()}
        return (
            <Manipulate
                value = {name}
                event = {() => }
            />
        )
    }
    
    render() {
        return(
        <>
        <input> qwe </input>
        <div> Member: {this.members} </div>
        <div> Final settle: {this.result}</div>
        <div> spending record: {this.record} </div>
        </>
        );
    }
}

class Platform extends React.Component {
    render() {
        
        return(<div>Here is Platform</div> );
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
  
ReactDOM.render( <Platform /> , document.getElementById('platform'));
ReactDOM.render( <History /> , document.getElementById('history'));
ReactDOM.render( <Result /> , document.getElementById('result'));
ReactDOM.render( <Note /> , document.getElementById('note'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
