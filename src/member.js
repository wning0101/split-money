import React from "react"


function Member(props){
        return(
            <div>
                <li> {props.name}: {props.balance} </li>
            </div>
        )
}

export default Member