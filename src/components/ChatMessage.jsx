import React from "react";

export default function ChatMessage({user, msg, now}) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sent = new Date(msg.date.seconds * 1000);
    let timestamp;
    if ((now-sent) < (24*3600*1000)) {
        timestamp = sent.toTimeString().slice(0,5)
    } else if ((now-sent) < (7*24*3600*1000)) {
        timestamp = days[sent.getDay()]
    } else {
        timestamp = sent.toDateString();
    }

    return (
        <div className={user !== msg.uid ? "sentMsg" : "receivedMsg"}>
            {user == msg.uid || JSON.stringify(msg.name)}
            {msg.msg}
            <br />
            <span>{timestamp}</span>
        </div>
    )
}