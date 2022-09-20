var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../libs/firebase_config";
import { useTimeout } from "../libs/utilityHooks";
import Chat from "./Chat/Chat";
import { myData, myUid } from "../libs/currentUserData";
//@ts-ignore
import messageIcon from "/images/message-svgrepo-com.svg";
export default function Sidebar() {
    const [openChatBox, setOpenChatBox] = useState(false);
    const [openChatList, setOpenChatList] = useState(false);
    const { timeout } = useTimeout();
    const [chats, setChats] = useState([]);
    const [currentChatID, setCurrentChatID] = useState("");
    const [currentChatName, setCurrentChatName] = useState("");
    const friendsModal = useRef(null);
    const circle = useRef(null);
    function getChatList() {
        return __awaiter(this, void 0, void 0, function* () {
            //get the chat list
            const q = query(collection(db, "users", myUid, "chats"));
            const chatData = yield getDocs(q);
            let chatList = [];
            // chatData format: [{chat_id: xxx, users: [yy, zz]}, {etc}]
            chatData.forEach((chat) => {
                let data = chat.data();
                let uid = chat.id;
                chatList.push({ uid: uid, chatID: data.chat_id });
            });
            //chatList format: [{uid: uid, chatID: chatID}, {...}]
            setChats(chatList);
        });
    }
    function startNewChat(uid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!myData)
                return;
            (_a = friendsModal.current) === null || _a === void 0 ? void 0 : _a.close();
            const test = chats.find((chat) => chat.uid === uid);
            if (test !== undefined) {
                setCurrentChatID(test.chatID);
                setCurrentChatName(myData.friends[uid]);
                setOpenChatBox(true);
            }
            else {
                console.log("creating new chat document");
                //create new document in "chats"
                const newChatID = doc(collection(db, "chats")).id;
                //add a new document to the "chats" collection of both users in chat
                yield setDoc(doc(db, "users", myUid, "chats", uid), {
                    chat_id: newChatID,
                    users: [myUid, uid],
                });
                yield setDoc(doc(db, "users", uid, "chats", myUid), {
                    chat_id: newChatID,
                    users: [myUid, uid],
                });
                setCurrentChatID(newChatID);
                setChats((prev) => [...prev, { uid: uid, chatID: newChatID }]);
                setCurrentChatName(myData.friends[uid]);
                setOpenChatBox(true);
            }
        });
    }
    function openOldChat(chat) {
        if (!myData)
            return;
        setCurrentChatID(chat.chatID);
        setCurrentChatName(myData.friends[chat.uid]);
        setOpenChatBox(true);
    }
    function showFriends() {
        if (friendsModal.current && typeof friendsModal.current.showModal === "function") {
            friendsModal.current.showModal();
        }
    }
    function animate() {
        if (circle.current) {
            circle.current.classList.add("circle-animate");
            timeout(() => { var _a; return (_a = circle.current) === null || _a === void 0 ? void 0 : _a.classList.remove("circle-animate"); }, 700);
        }
    }
    function openChatApp() {
        if (openChatList === false) {
            animate();
            setOpenChatList(true);
        }
        else {
            setOpenChatList(false);
        }
    }
    useEffect(() => {
        setCurrentChatID((prev) => prev);
    }, [myData]);
    useEffect(() => {
        getChatList();
    }, []); // eslint-disable-line -- This is definitely only going to be called once
    if (myData === undefined) {
        return React.createElement("div", null, "Error");
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: 'friends-list' },
            React.createElement("h3", { className: 'align-center', onClick: openChatApp },
                React.createElement("img", { id: 'message-icon', src: messageIcon, alt: 'messages' }),
                React.createElement("div", { className: 'circle', ref: circle }),
                React.createElement("span", null,
                    "\u00A0",
                    openChatList ? "Chats" : "Open Chat")),
            openChatList && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'highlight secondary', onClick: showFriends }, "New Chat"),
                React.createElement("dialog", { className: 'modal', ref: friendsModal },
                    React.createElement("h3", null, "Friends"),
                    typeof myData.friends === "object" &&
                        Object.keys(myData.friends).map((uid, i) => {
                            return (React.createElement("div", { className: 'highlight', key: i, onClick: () => startNewChat(uid) }, myData.friends[uid]));
                        }),
                    React.createElement("button", { value: 'cancel', onClick: () => { var _a; return (_a = friendsModal.current) === null || _a === void 0 ? void 0 : _a.close(); } }, "Cancel")),
                typeof myData.friends === "object" &&
                    chats.length > 0 &&
                    chats.map((chat, i) => {
                        return (React.createElement("div", { key: i, className: 'highlight', onClick: () => openOldChat(chat) }, myData.friends[chat.uid]));
                    })))),
        openChatBox && React.createElement(Chat, { chatID: currentChatID, chatName: currentChatName, setOpenChatBox: setOpenChatBox })));
}
