import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_config";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage)
            // ..
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={event=> setEmail(event.target.value)} 
                placeholder="Email" 
            />
            <input 
                type="password" 
                name="password" 
                onChange={event=> setPass(event.target.value)} 
                value={pass} 
                placeholder="Password" 
            />
            <button onClick={handleSubmit} type="button">Log In</button>
        </form>
    )
}