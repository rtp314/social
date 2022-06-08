import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import React, {useEffect, useRef, useState} from "react";
import { auth, db } from "../libs/firebase_config";
import { useUserData } from "../libs/UserContext";
import {useTimeout} from "../libs/utilityHooks";
import Chat from "./Chat";
import messageIcon from "../images/message-svgrepo-com.svg";

export default function Sidebar() {
    const myID = auth.currentUser.uid
    const [openChatBox, setOpenChatBox] = useState(false);
    const [openChatList, setOpenChatList] = useState(false);
    const [timeout, clear] = useTimeout();
    const [chats, setChats] = useState([]);
    const [currentChatID, setCurrentChatID] = useState("")
    const [currentChatName, setCurrentChatName] = useState("")
    const myData = useUserData()
    const friendsModal = useRef();
    const circle = useRef();

    async function getChatList() {
        //get the chat list
        const q = query(collection(db, "users", myID, "chats"))
        const chatData = await getDocs(q);
        let chatList = [];

        // chatData format: [{chat_id: xxx, users: [yy, zz]}, {...}]
        chatData.forEach(chat => {
            let data = chat.data();
            let uid = chat.id
            chatList.push({uid: uid, chatID: data.chat_id})
        })
        //chatList format: [{uid: uid, chatID: chatID}, {...}]
        setChats(chatList)
    }

    async function startNewChat(uid) {
        friendsModal.current.close()
        const test = chats.find(chat => chat.uid === uid)

        if (test != undefined) {

            setCurrentChatID(test.chatID);
            setCurrentChatName(myData.friends[uid]);
            setOpenChatBox(true);

        } else {

            console.log("creating new chat document")
            //create new document in "chats"
            const newChatID = doc(collection(db, "chats")).id;
            
            //add a new document to the "chats" collection of both users in chat
            await setDoc(doc(db, "users", myID, "chats", uid), {
                chat_id: newChatID,
                users: [myID, uid]
            });
            await setDoc(doc(db, "users", uid, "chats", myID), {
                chat_id: newChatID,
                users: [myID, uid]
            });
            
            setCurrentChatID(newChatID);
            setChats(prev => [...prev, {[uid]: newChatID}]);
            setCurrentChatName(myData.friends[uid]);
            setOpenChatBox(true);

        }
    }

    function openOldChat(chat) {
        setCurrentChatID(chat.chatID);
        setCurrentChatName(myData.friends[chat.uid]);
        setOpenChatBox(true);
    }

    function showFriends() {
        if (typeof friendsModal.current.showModal === "function") {
            friendsModal.current.showModal()
        }
    }

    function animate() {
        circle.current.classList.add("circle-animate");
        timeout(()=>circle.current.classList.remove("circle-animate"), 700)
    }

    function openChatApp() {
        if (openChatList === false) {
            animate();
            setOpenChatList(true)
        } else {
            setOpenChatList(false)
        }
    }

    useEffect(()=>{
        getChatList();
    }, [])

    return (
        <>
            <div id="friends-list">
                
                <h3 className="align-center" onClick={openChatApp}>
                    <img id="message-icon" src={messageIcon}/>
                    <div className="circle" ref={circle}></div>
                    <span>&nbsp;Chats</span>
                </h3>
                
                {openChatList &&
                <>
                <div className="highlight secondary" onClick={showFriends}>New Chat</div>

                <dialog className="modal" ref={friendsModal}>
                    <h3>Friends</h3>
                    {typeof myData.friends === "object" && Object.keys(myData.friends).map((uid, i) => { return (
                        <div className="highlight" key={i} onClick={()=>startNewChat(uid)}>{myData.friends[uid]}</div>
                    )})}
                    <button value="cancel" onClick={()=>friendsModal.current.close()}>Cancel</button>
                </dialog>
                    
                {typeof myData.friends === "object" && chats.length > 0 && 
                    chats.map((chat, i) => { return (
                        <div key={i} className="highlight" onClick={()=>openOldChat(chat)}>{myData.friends[chat.uid]}</div>
                    )})
                }
                </>}
            </div>
            {openChatBox && <Chat chatID={currentChatID} chatName={currentChatName} setOpenChatBox={setOpenChatBox} />}
        </>
    )
}