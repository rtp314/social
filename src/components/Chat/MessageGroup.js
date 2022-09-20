import React from "react";
import ChatMessage from "./ChatMessage";
export default function MessageGroup({ msgGroup, user }) {
    return (React.createElement("div", { className: 'messagegroup' },
        React.createElement("span", { className: 'timestamp' }, msgGroup[0].day),
        msgGroup.map((msg) => {
            return React.createElement(ChatMessage, { msg: msg, user: user });
        })));
}
