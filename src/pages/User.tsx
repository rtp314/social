import React from "react";
import "../styles/user.css";

export default function User() {
	return (
		<div id='user' className='feed'>
			<div className='settings-sidebar'>
				<ul>
					<li>Account</li>
					<li>Personal Data</li>
					<li>Other</li>
				</ul>
			</div>
			<Account />
		</div>
	);
}

function Account() {
	return (
		<div className='settings-main'>
			<h2>Account Settings</h2>
			<ul>
				<li>Name</li>
				<li>Email</li>
				<li>Password</li>
			</ul>
		</div>
	);
}
