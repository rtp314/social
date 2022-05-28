import React, { useEffect } from "react";
import { auth } from "../libs/firebase_config";
import useMessages from "../libs/useMessages";
import MessageGroup from "./MessageGroup";
import ChatWriter from "./ChatWriter";


export default function Chat({chatID, chatName}) {
    const [loading, msgList] = useMessages({chatID});

    useEffect(()=>{
        document.getElementById("chatBottom").scrollIntoView({behavior: "smooth"})
    }, [msgList])

    return(
        <div className="chatbox">
            <span>Chat with {chatName}</span>
            <div className="chat-messages">
                {loading ? 
                    "Loading messages" 
                : 
                    msgList[0].length !== 0 && msgList.map((msgGroup, index) => <MessageGroup user={auth.currentUser.uid} msgGroup={msgGroup} key={index} />)
                }

                <div id="chatBottom"></div>
            </div>
            <ChatWriter chatID={chatID}/>
        </div>
    )
}