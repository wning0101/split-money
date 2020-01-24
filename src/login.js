import React from "react"

function Login(props){
    if (props.email == "" || props.password == ""){
        return(
            <>
            <p> Email: </p> <input id="email_l"></input>
            <p> password: </p> <input id="password_l"></input>
            <button onClick={props.login}>Login</button>
            </>
        )
    }
    else{
        return(
        <a> Hello, {props.name}</a>
        )
    }
}

export default Login;