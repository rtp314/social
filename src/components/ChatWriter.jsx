import React, {useState} from "react";
import { collection, addDoc, Timestamp, } from "firebase/firestore";
import { auth, db } from "../libs/firebase_config";

export default function ChatWriter() {
    const [newMsg, setNewMsg] = useState([]);

    async function handleMessage(e) {
        e.preventDefault();
        const msg = newMsg;
        setNewMsg("");
        await addDoc(collection(db, "messages"), {
            date: Timestamp.now(),
            msg: msg,
            uid: auth.currentUser.uid,
        });
    }

    return (
        <form onSubmit={handleMessage}>
            <input type="text" value={newMsg} onChange={(e)=>setNewMsg(e.target.value)} placeholder="Type your message here" />
            <button type="submit">Send</button>
        </form>
    )
}