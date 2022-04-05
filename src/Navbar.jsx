import React from "react";
import useAuthStatus from "./libs/useAuth";

export default function Navbar() {
    const isLoggedIn = useAuthStatus()

    return (
        <nav className="navbar">
            {isLoggedIn ? "signed in" : "not signed in"}
        </nav>
    )
}