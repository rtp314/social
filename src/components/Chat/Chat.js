import React, { useEffect, useState } from "react";
import { auth } from "../../libs/firebase_config";
import useMessages from "../../libs/useMessages";
import MessageGroup from "./MessageGroup";
import ChatWriter from "./ChatWriter";
export default function Chat({ chatID, chatName, setOpenChatBox }) {
    const [loading, msgList] = useMessages(chatID);
    const [showChat, setShowChat] = useState(true);
    useEffect(() => {
        var _a;
        if (showChat === true) {
            (_a = document.getElementById("chatBottom")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "auto" });
        }
    }, [msgList, showChat]);
    return (React.createElement("div", { className: 'chatbox' },
        React.createElement("div", { className: 'flex-between', onClick: () => setShowChat((prev) => !prev) },
            React.createElement("div", null, chatName),
            showChat && (React.createElement("div", { className: 'close', onClick: () => setOpenChatBox(false) }, "X"))),
        showChat && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'chat-messages' },
                loading
                    ? "Loading messages"
                    : msgList[0].length !== 0 &&
                        msgList.map((msgGroup, index) => {
                            var _a;
                            return (React.createElement(MessageGroup, { user: ((_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || "unknown", msgGroup: msgGroup, key: index }));
                        }),
                React.createElement("div", { id: 'chatBottom' })),
            React.createElement(ChatWriter, { chatID: chatID })))));
}
