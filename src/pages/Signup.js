import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../libs/firebase_config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                friends: [],
            }).then(() => navigate("/"));
        })
            .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    return (React.createElement("div", { className: 'feed' },
        React.createElement("div", { className: 'login' },
            React.createElement("h1", null, "Create New User"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("input", { type: 'email', name: 'email', value: email, onChange: (event) => setEmail(event.target.value), placeholder: 'Email' }),
                React.createElement("br", null),
                React.createElement("input", { type: 'password', name: 'password', onChange: (event) => setPass(event.target.value), value: pass, placeholder: 'Password' }),
                React.createElement("br", null),
                React.createElement("button", { className: 'button primary', type: 'submit' }, "Create User"),
                React.createElement("button", { className: 'button light', type: 'button', onClick: () => navigate("/login") }, "Back to login")))));
}
