import React, { useEffect, useState } from "react";
import useAuthStatus from "../libs/useAuthStatus";
import { signOut } from "firebase/auth";
import { auth } from "../libs/firebase_config";
import logo from "../images/logo3.svg";
import gear from "../images/gear-svgrepo-com.svg"
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, myID] = useAuthStatus();

    function handleSignOut() {
		signOut(auth)
		.then(()=>{
			console.log("signed out")
		});
	}

    return (
        <>
            <nav className="navbar flex-between">
                <div className="align-center">
                    <img id="logo-img" src={logo} alt="Social Logo" />
                    <em className="mx1">Social</em>
                </div>
                <div className="align-center">
                    <UserMenu />
                    {isLoggedIn ? auth.currentUser.email : "not signed in"}
                    <button className="button mx1" onClick={handleSignOut} type="button">Sign Out</button>
                </div>
            </nav>
            <div className="nav-spacer"></div>
            <div className="wrapper-center">
                <Outlet />
            </div>
        </>
    )
}

export function UserMenu() {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const dropdown = document.getElementById("dropdown")
        const gear = document.getElementById("gear-img")

        function handleClick(e) {
            if (!(e.target === dropdown || e.target === gear )) {
                setShowMenu(false)
            }
        }

        window.addEventListener("click", handleClick)

        return ()=>window.removeEventListener("click", handleClick)

    }, [])

    return (
        <div id="dropdown" className="dropdown" onClick={()=>setShowMenu(prev=> prev ? false : true)} onFocusOut={()=>setShowMenu(false)}>
            <img id="gear-img" alt="User settings" className="mx1" src={gear} />
            {showMenu && <div id="user-menu">
                <ul>
                    <li><Link to="./User">Account Settings</Link></li>
                    <li>Add Friends</li>
                    <li >Sign Out</li>
                </ul>
            </div>}
        </div>
    )
}