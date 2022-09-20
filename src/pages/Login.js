import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase_config";
import { Link, useNavigate } from "react-router-dom";
const savedUsers = [
    { email: "4321@gmail.com", pass: "123456789" },
    { email: "1234@gmail.com", pass: "123456789" },
    { email: "1111@gmail.com", pass: "123456789" },
];
export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/");
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    return (React.createElement("div", { className: 'feed' },
        React.createElement("div", { className: 'login' },
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("h1", null, "Log in here."),
                React.createElement("input", { type: 'email', name: 'email', value: email, onChange: (event) => setEmail(event.target.value), placeholder: 'Email' }),
                React.createElement("br", null),
                React.createElement("input", { type: 'password', name: 'password', onChange: (event) => setPass(event.target.value), value: pass, placeholder: 'Password' }),
                React.createElement("br", null),
                React.createElement("button", { className: 'primary', type: 'submit' }, "Log In")),
            React.createElement("p", null,
                "No user? ",
                React.createElement(Link, { to: '/signup' }, "Sign up here!"))),
        React.createElement("div", { className: 'saved-users' },
            React.createElement("p", null, "Saved Accounts"),
            savedUsers.map((user) => (React.createElement(SavedUser, { user: user }))))));
}
function SavedUser({ user }) {
    const navigate = useNavigate();
    function handleLogin() {
        signInWithEmailAndPassword(auth, user.email, user.pass)
            .then(() => navigate("/"))
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    return (React.createElement("button", { className: 'saved-user light', onClick: handleLogin }, user.email));
}
