import React from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import logo from "../images/logo3.svg";

export default function Entry() {
	return (
		<div id='entry'>
			<img src={logo} id='entry-logo' />
			<h2>Welcome to Social</h2>
			<p>Content will be loaded here when logged in</p>
			<Link to='/login'>Log in</Link> or <Link to='/signup'>sign up</Link>
		</div>
	);
}
