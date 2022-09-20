import React from "react";
export default function ChatMessage({ user, msg }) {
    return (React.createElement("div", { className: user !== msg.uid ? "sentMsg msg" : "receivedMsg msg" },
        React.createElement("span", { className: 'timestamp' }, msg.time),
        msg.msg));
}
