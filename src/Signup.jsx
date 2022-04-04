import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase_config";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)

            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

    return (
        <>
            <h1>Create New User</h1>
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
                <button onClick={handleSubmit} type="button">Create User</button>
            </form>
        </>
        
    )
}