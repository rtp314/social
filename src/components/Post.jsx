import React from "react";
import Avatar from "./Avatar";
import Reactions from "./Reactions";

export default function Post({post, now}) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const sent = new Date(post.date.seconds * 1000);
    let timestamp;
    if ((now-sent) < (24*3600*1000)) {
        timestamp = sent.toTimeString().slice(0,5)
    } else if ((now-sent) < (7*24*3600*1000)) {
        timestamp = days[sent.getDay()]
    } else {
        timestamp = sent.toDateString();
    }
    
    return (
        <div className="post">
            <div className="post-title">
                <Avatar />
                <span>{timestamp}</span>
            </div>
            <div className="post-body">
                {post.body}
            </div>
            <Reactions />
        </div>
    )

}