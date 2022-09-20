import React from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import logo from "/images/logo3.svg";
export default function Entry() {
    return (React.createElement("div", { id: 'entry' },
        React.createElement("img", { src: logo, id: 'entry-logo' }),
        React.createElement("h2", null, "Welcome to Social"),
        React.createElement("p", null, "Content will be loaded here when logged in"),
        React.createElement(Link, { to: '/login' }, "Log in"),
        " or ",
        React.createElement(Link, { to: '/signup' }, "sign up")));
}
