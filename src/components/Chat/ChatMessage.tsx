import React from "react";

export default function ChatMessage({user, msg}) {
    return (
        <div className={user !== msg.uid ? "sentMsg msg" : "receivedMsg msg"}>
            {user === msg.uid || JSON.stringify(msg.name)}
            <span className="timestamp">{msg.time}</span>
            {msg.msg}
        </div>
    )
}