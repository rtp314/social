import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../libs/firebase_config";

export default function ChatWriter({ chatID }) {
	const [newMsg, setNewMsg] = useState<string>("");

	async function handleMessage(e: React.FormEvent) {
		e.preventDefault();
		const msg = newMsg;
		setNewMsg("");
		await addDoc(collection(db, "chats", chatID, "messages"), {
			date: Timestamp.now(),
			msg: msg,
			uid: auth.currentUser?.uid,
		});
	}

	return (
		<div className='chat-writer'>
			<form onSubmit={handleMessage}>
				<input
					type='text'
					value={newMsg}
					onChange={(e) => setNewMsg(e.target.value)}
					placeholder='Type your message here'
				/>
				<button className='button primary' type='submit'>
					Send
				</button>
			</form>
		</div>
	);
}
