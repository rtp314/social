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
	const { loggedIn } = useAuthStatus();

	function handleNav() {}

	return (
		<>
			<nav className='navbar'>
				<div className='flex-between h100 m3x'>
					<Link className='plain-link em' to='/'>
						<div className='align-center' onClick={handleNav}>
							<img id='logo-img' src={logo} alt='Social Logo' />
							<span className='mx1'>Social</span>
						</div>
					</Link>
					<div className='align-center'>
						<UserMenu />
						{loggedIn ? auth.currentUser?.email : "not signed in"}
					</div>
				</div>
			</nav>
			<div id='main' className='wrapper-center'>
				<Outlet />
			</div>
		</>
	);
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

		function handleClick(e: Event) {
			if (!(e.target === dropdown || e.target === gear)) {
				setShowMenu(false);
			}
		}

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);

	return (
		<div
			id='dropdown'
			className='dropdown'
			onClick={() => setShowMenu((prev) => (prev ? false : true))}
			onBlur={() => setShowMenu(false)}
		>
			<img id='gear-img' alt='User settings' className='mx1' src={gear} />
			{showMenu && (
				<div id='user-menu'>
					<ul>
						<li>
							<Link className='plain-link' to='./User'>
								Account Settings
							</Link>
						</li>
						<li>Add Friends</li>
						<li onClick={handleSignOut}>Sign Out</li>
					</ul>
				</div>
			)}
		</div>
	);
}
