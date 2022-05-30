import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../libs/firebase_config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

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
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                friends: [],
            })
            .then(navigate("/"))
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

    return (
        <div className="feed">
            <div className="login">
                <h1>Create New User</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={event=> setEmail(event.target.value)} 
                        placeholder="Email" 
                    />
                    <br />
                    <input 
                        type="password" 
                        name="password" 
                        onChange={event=> setPass(event.target.value)} 
                        value={pass} 
                        placeholder="Password" 
                    />
                    <br/>
                    <button className="button primary" type="submit">Create User</button>
                    <button className="button light" type="button" onClick={()=>navigate("/login")}>Back to login</button>
                </form>
            </div>
        </div>
        
    )
}