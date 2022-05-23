import React from "react";
import ChatMessage from "./ChatMessage";

export default function MessageGroup({msgGroup, user}) {
    if (msgGroup[0].length == 0) {
        return <span>No messages</span>
    }
    return (
        <div className="messagegroup">
            <span className="timestamp">{msgGroup[0].day}</span>
            {msgGroup.map(msg => {
                return <ChatMessage msg={msg} user={user} />
            })}
        </div>
    )
}