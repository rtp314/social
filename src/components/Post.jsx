import React, { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import Reactions from "./Reactions";
import { getTimestamp } from "../libs/utils";
import { getDownloadURL } from "firebase/storage";
import { useUserData } from "../libs/UserContext";

export default function Post({post, now}) {
    const timestamp = getTimestamp(post.date);
    const {friends} = useUserData();
    
    return (
        <div className="post">
            <div className="post-title">
                <span>{friends && friends[post.uid]}</span>  
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