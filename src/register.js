import React from "react"

function Register(props){
    if (props.email == "" || props.password == ""){
        return(
            <>
            <p> Name: </p> <input id="name_r"></input>
            <p> Email: </p> <input id="email_r"></input>
            <p> password: </p> <input id="password_r"></input>
            <button onClick={props.register}>Register</button>
            </>
        )
    }
    else{
        return(
        <a></a>
        )
    }
}

export default Register;