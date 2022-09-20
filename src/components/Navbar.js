import React, { useEffect, useState } from "react";
import useAuthStatus from "../libs/useAuthStatus";
import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase_config";
//@ts-ignore
import logo from "/images/logo3.svg";
//@ts-ignore
import gear from "/images/gear-svgrepo-com.svg";
import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
    var _a;
    const { loggedIn } = useAuthStatus();
    function handleNav() { }
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: 'navbar' },
            React.createElement("div", { className: 'flex-between h100 m3x' },
                React.createElement(Link, { className: 'plain-link em', to: '/' },
                    React.createElement("div", { className: 'align-center', onClick: handleNav },
                        React.createElement("img", { id: 'logo-img', src: logo, alt: 'Social Logo' }),
                        React.createElement("span", { className: 'mx1' }, "Social"))),
                React.createElement("div", { className: 'align-center' },
                    React.createElement(UserMenu, null),
                    loggedIn ? (_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.email : "not signed in"))),
        React.createElement("div", { id: 'main', className: 'wrapper-center' },
            React.createElement(Outlet, null))));
}
export function UserMenu() {
    const [showMenu, setShowMenu] = useState(false);
    function handleSignOut() {
        signOut(auth).then(() => {
            console.log("signed out");
        });
    }
    useEffect(() => {
        const dropdown = document.getElementById("dropdown");
        const gear = document.getElementById("gear-img");
        function handleClick(e) {
            if (!(e.target === dropdown || e.target === gear)) {
                setShowMenu(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);
    return (React.createElement("div", { id: 'dropdown', className: 'dropdown', onClick: () => setShowMenu((prev) => (prev ? false : true)), onBlur: () => setShowMenu(false) },
        React.createElement("img", { id: 'gear-img', alt: 'User settings', className: 'mx1', src: gear }),
        showMenu && (React.createElement("div", { id: 'user-menu' },
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement(Link, { className: 'plain-link', to: './User' }, "Account Settings")),
                React.createElement("li", null, "Add Friends"),
                React.createElement("li", { onClick: handleSignOut }, "Sign Out"))))));
}
