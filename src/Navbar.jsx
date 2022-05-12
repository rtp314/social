import React from "react";
import useAuthStatus from "./libs/useAuthStatus";
import { signOut } from "firebase/auth";
import { auth } from "./libs/firebase_config";

export default function Navbar() {
    const isLoggedIn = useAuthStatus()

    function handleSignOut() {
		signOut(auth)
		.then(()=>{
			console.log("signed out")
		});
	}

    return (
        <nav className="navbar">
            {isLoggedIn ? auth.currentUser.email : "not signed in"}
            <button onClick={handleSignOut} type="button">Sign Out</button>
        </nav>
    )
}