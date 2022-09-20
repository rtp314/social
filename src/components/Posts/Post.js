import React from "react";
import { getTimestamp } from "../../libs/utils";
import useAuthStatus from "../../libs/useAuthStatus";
import { myData } from "../../libs/currentUserData";
export default function Post({ post }) {
    const timestamp = getTimestamp(post.date);
    const { myID } = useAuthStatus();
    return (React.createElement("div", { className: 'post' },
        React.createElement("div", { className: 'post-title' },
            React.createElement("span", null, post.uid === myID ? "Me" : myData && (myData === null || myData === void 0 ? void 0 : myData.friends[post.uid])),
            React.createElement("span", null, timestamp)),
        React.createElement("div", { className: 'post-body' },
            post.images && (React.createElement("div", null, post.images.map((url, i) => (React.createElement("img", { key: i, alt: post.date + i, className: 'post-img', src: url }))))),
            post.body)));
}
