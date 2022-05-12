import React, { useEffect, useState } from "react";
import { auth, db } from "../libs/firebase_config";
import { collection, addDoc, Timestamp, } from "firebase/firestore";
import useMessages from "../libs/useMessages";
import MessageGroup from "./MessageGroup";


export default function Chat() {
    const [newMsg, setNewMsg] = useState([]);
    const msgList = useMessages();
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

    useEffect(()=>{
        document.getElementById("chatBottom").scrollIntoView({behavior: "smooth"})
    }, [msgList])

    return(
        <div className="chatbox">
            {msgList.length < 1 ? "Loading messages" : msgList.map((msgGroup, index) => <MessageGroup user={auth.currentUser.uid} msgGroup={msgGroup} key={index} />)}
            <form onSubmit={handleMessage}>
                <input type="text" value={newMsg} onChange={(e)=>setNewMsg(e.target.value)} placeholder="Type your message here" />
                <button type="submit">Send</button>
            </form>
            <div id="chatBottom"></div>
        </div>
    )
}