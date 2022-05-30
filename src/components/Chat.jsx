import React, { useEffect, useState } from "react";
import { auth } from "../libs/firebase_config";
import useMessages from "../libs/useMessages";
import MessageGroup from "./MessageGroup";
import ChatWriter from "./ChatWriter";


export default function Chat({chatID, chatName, setOpenChatBox}) {
    const [loading, msgList] = useMessages({chatID});
    const [showChat, setShowChat] = useState(true)

    useEffect(()=>{
        if (showChat) {
            document.getElementById("chatBottom").scrollIntoView({behavior: "auto"})
        }
    }, [msgList, showChat])

    return(
        <div className="chatbox">
            <div onClick={()=>setShowChat(prev=>!prev)}>{chatName}</div>
            {showChat && <>
                <div className="chat-messages">
                    {loading ? 
                        "Loading messages" 
                    : 
                        msgList[0].length !== 0 && msgList.map((msgGroup, index) => <MessageGroup user={auth.currentUser.uid} msgGroup={msgGroup} key={index} />)
                    }

                    <div id="chatBottom"></div>
                </div>
                <ChatWriter chatID={chatID}/>
            </>}
            
        </div>
    )
}