import React, { useEffect } from "react";
import { auth } from "../libs/firebase_config";
import useMessages from "../libs/useMessages";
import MessageGroup from "./MessageGroup";
import ChatWriter from "./ChatWriter";


export default function Chat() {
    const msgList = useMessages();

    useEffect(()=>{
        document.getElementById("chatBottom").scrollIntoView({behavior: "smooth"})
    }, [msgList])

    return(
        <div className="chatbox">
            {msgList.length < 1 ? "Loading messages" : msgList.map((msgGroup, index) => <MessageGroup user={auth.currentUser.uid} msgGroup={msgGroup} key={index} />)}
            <div id="chatBottom"></div>
            <ChatWriter />
        </div>
    )
}