import React from 'react'

function Sharer(props){
    return(
        <div>
        <input id={props.name} type="checkbox" name={props.name}/> {props.name}
        </div>
    );
}

export default Sharer