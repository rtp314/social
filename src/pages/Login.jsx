import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase_config";
import { Link, useNavigate } from "react-router-dom";

const savedUsers = [{email: "4321@gmail.com", pass: "123456789"}, {email:"1234@gmail.com", pass: "123456789"}, {email:"1111@gmail.com", pass:"123456789"}]

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            navigate("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage)
        });
    }

    return (
        <div className="wrapper-center">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>Log in here.</h1>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={event=> setEmail(event.target.value)} 
                        placeholder="Email" 
                    />
                    <br/>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={event=> setPass(event.target.value)} 
                        value={pass} 
                        placeholder="Password" 
                    />
                    <br/>
                    <button type="submit">Log In</button>
                </form>
                <p>No user? <Link to="/signup">Sign up here!</Link></p>
            </div>
            <div className="saved-users">
                <p>Saved Accounts</p>
                {savedUsers.map(user=><User user={user}/>)}
            </div>
        </div>
        
        
    )
}

function User({user}) {
    const navigate = useNavigate();

    function handleLogin() {
        signInWithEmailAndPassword(auth, user.email, user.pass)
        .then(() => navigate("/"))
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage)
        });
    }

    return (
        <div className="saved-user" onClick={handleLogin}>
            {user.email}
        </div>
    )
}