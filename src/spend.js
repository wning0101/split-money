import React from 'react'

function Spend(props){
    let shares = " "
    for(let i=0; i<props.share.length; i++){
        shares += props.share[i] + ", "
    }
    return(
        <li>{props.pay} paid {props.amount} for {shares} </li>
    );
}

export default Spend;