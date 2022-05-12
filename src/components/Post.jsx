import React from "react";
import Avatar from "./Avatar";
import Reactions from "./Reactions";
import { getTimestamp } from "../libs/utils";

export default function Post({post, now}) {
    const timestamp = getTimestamp(post.date)
    
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