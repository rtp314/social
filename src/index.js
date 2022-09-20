import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/utility.css";
import "./styles/chat.css";
import "./styles/navbar.css";
import "./styles/posts.css";
import Navbar from "./components/Navbar";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Entry from "./components/Entry";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(React.StrictMode, null,
    React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: '/', element: React.createElement(Navbar, null) },
                React.createElement(Route, { index: true, element: React.createElement(App, null) }),
                React.createElement(Route, { path: 'login', element: React.createElement(Login, null) }),
                React.createElement(Route, { path: 'signup', element: React.createElement(Signup, null) }),
                React.createElement(Route, { path: 'user', element: React.createElement(User, null) })),
            React.createElement(Route, { path: '/entry', element: React.createElement(Entry, null) })))));
