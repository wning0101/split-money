import React from 'react'

function Payer(props){
    return(
        <option value={props.name}> {props.name} </option>
    );
}

export default Payer