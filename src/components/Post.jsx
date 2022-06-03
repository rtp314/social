import React, { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import Reactions from "./Reactions";
import { getTimestamp } from "../libs/utils";
import { getDownloadURL } from "firebase/storage";

export default function Post({post, now}) {
    const timestamp = getTimestamp(post.date)
    
    return (
        <div className="post">
            <div className="post-title">
                <Avatar />
                <span>{timestamp}</span>
            </div>
            <div className="post-body">
                {post.images && <div>
                    {post.images.map(url => <img className="post-img" src={url} />)}
                </div>}
                {post.body}
            </div>
            <Reactions />
        </div>
    )

}