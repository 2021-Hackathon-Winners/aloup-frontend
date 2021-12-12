import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { auth } from './ServerProvider';
import './Signin.css';

export declare namespace google {
    let accounts: any
} 

const Signin: React.FC<{onSignin: (a: string) => void}> = (props) =>  {
    const [em, sem] = useState("")
    
    useEffect(() => {
        async function handleCredentialResponse(response: any) {
            const a = await (auth(response.credential).catch(() => {
                sem("There was an error signing in")
            }))
            if (!a) {sem("There was an error signing in"); return}
            console.log(a)
            window.localStorage.setItem("auth", a)
            props.onSignin(a)
        }

        google.accounts.id.initialize({
        client_id: "302391518498-77o8papa3iri6mj4ihjl9vikislodqi0.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: true,
        ux_mode: "popup"
        });
        google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_black", size: "large", shape: "pill" } 
        );
        google.accounts.id.prompt();
    }, [props])
    
    return (
    <>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>aloup</h1>
        <div id="buttonDiv"></div>
        <p className="errorMessage">{em}</p>
    </>
    );
  }
  
  export default Signin;