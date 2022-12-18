import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../libs/firebase_config";
import { Link, useNavigate } from "react-router-dom";

interface SavedUser {
	email: string;
	pass: string;
}

const savedUsers: SavedUser[] = [
	{ email: "4321@gmail.com", pass: "123456789" },
	{ email: "1234@gmail.com", pass: "123456789" },
	{ email: "1111@gmail.com", pass: "123456789" },
];

export default function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const navigate = useNavigate();

	function handleSubmit(event: React.FormEvent) {
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

	return (
		<div className='feed'>
			<div className='login'>
				<form onSubmit={handleSubmit}>
					<h1>Log in here.</h1>
					<input
						type='email'
						name='email'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder='Email'
					/>
					<br />
					<input
						type='password'
						name='password'
						onChange={(event) => setPass(event.target.value)}
						value={pass}
						placeholder='Password'
					/>
					<br />
					<button className='primary' type='submit'>
						Log In
					</button>
				</form>
				<p>
					No user? <Link to='/signup'>Sign up here!</Link>
				</p>
			</div>
			<div className='saved-users'>
				<p>Saved Accounts</p>
				{savedUsers.map((user, i) => (
					<SavedUser key={i} user={user} />
				))}
			</div>
		</div>
	);
}

function SavedUser({ user }: { user: SavedUser }) {
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

	return (
		<button className='saved-user light' onClick={handleLogin}>
			{user.email}
		</button>
	);
}
