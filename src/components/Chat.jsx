import React, { useEffect, useState } from "react";
import { auth, db } from "../libs/firebase_config";
import { collection, addDoc, Timestamp, } from "firebase/firestore";
import ChatMessage from "./ChatMessage";
import useMessages from "../libs/useMessages";


export default function Chat() {
    const [newMsg, setNewMsg] = useState([]);
    const newList = useMessages();
    const [now, setNow] = useState(new Date());
    
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

    useEffect(()=>{
        const interval = setInterval(()=> setNow(new Date()), 3000)
        return ()=>clearInterval(interval)
    }, [])

    return(
        <div className="chatbox">
            {newList.length < 1 ? "Loading messages" : newList.map((msg, index)=><ChatMessage user={auth.currentUser.uid} msg={msg} key={index} now={now} />)}
            <form onSubmit={handleMessage}>
                <input type="text" value={newMsg} onChange={(e)=>setNewMsg(e.target.value)} placeholder="Type your message here" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}