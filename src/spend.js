import React from 'react'

function Spend(props){
    let shares = " "
    for(let i=0; i<props.share.length; i++){
        shares += props.share[i] + ", "
    }
    var n = shares.length
    shares = shares.substring(0, n-2)
    return(
    <li>{props.pay} paid ${props.amount} for {props.sub} [{shares}] </li>
    );
}

export default Spend; 