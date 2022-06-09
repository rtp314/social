import React from "react";
import { getTimestamp } from "../libs/utils";
import { useUserData } from "../libs/UserContext";
import useAuthStatus from "../libs/useAuthStatus";

export default function Post({post}) {
    const timestamp = getTimestamp(post.date);
    const {friends} = useUserData();
    const {myID} = useAuthStatus();
    
    return (
        <div className="post">
            <div className="post-title">
                <span>{post.uid === myID ? "Me" : friends && friends[post.uid]}</span>  
                <span>{timestamp}</span>
            </div>
            <div className="post-body">
                {post.images && <div>
                    {post.images.map((url, i) => <img key={i} alt={post.date + i} className="post-img" src={url} />)}
                </div>}
                {post.body}
            </div>
        </div>
    )

}