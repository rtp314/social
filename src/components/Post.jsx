import React from "react";
import Avatar from "./Avatar";
import Reactions from "./Reactions";

export default function Post(postID) {
    return (
        <div className="post">
            <Avatar /> 22/07/2021
            <div className="post-body">
                Body Text
            </div>
            <Reactions />
        </div>
    )

}