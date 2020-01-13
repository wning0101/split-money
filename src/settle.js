import React from 'react'

function Settle(props){
    return(
        <li> {props.give} gives {props.recieve} {props.amount} dollars. </li>
    );
}

export default Settle