import React from "react";
import ChatMessage from "./ChatMessage";

export default function MessageGroup({msgGroup, user}) {
    return (
        <div className="messagegroup">
            <span className="timestamp">{msgGroup[0].day}</span>
            {msgGroup.map(msg => {
                return <ChatMessage msg={msg} user={user} />
            })}
        </div>
    )
}