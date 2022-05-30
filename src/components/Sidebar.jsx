import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { auth, db } from "../libs/firebase_config";
import { useUserData } from "../libs/UserContext";
import Chat from "./Chat";

export default function Sidebar() {
    const myID = auth.currentUser.uid
    const [openChatBox, setOpenChatBox] = useState(false);
    const [chats, setChats] = useState([]);
    const [currentChatID, setCurrentChatID] = useState("")
    const [currentChatName, setCurrentChatName] = useState("")
    const myData = useUserData()

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
        //chatList format: [{uid: chat_id}, {...}]
        setChats(chatList)
    }

    async function startChat(uid) {
        const test = chats.find(chat => chat.uid === uid)

        if (test != undefined) {

            console.log("found old chat");
            setCurrentChatID(test[uid]);
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

    function openChat(chat) {
        setCurrentChatID(chat.chatID);
        setCurrentChatName(myData.friends[chat.uid]);
        setOpenChatBox(true);
    }

    useEffect(()=>{
        getChatList();
    }, [])

    return (
        <>
            <div id="friends-list">
                <h3>Friends</h3>
                {typeof myData.friends === "object" &&
                    Object.keys(myData.friends).map((uid, i) => { return (
                        <p key={i}>{myData.friends[uid]}
                            <button className="secondary" onClick={()=>startChat(uid)}>Chat</button>
                        </p>
                    )})
                }
                <h3>Chats</h3>
                {typeof myData.friends === "object" && chats.length > 0 && 
                    chats.map(chat => { return (
                        <p>{myData.friends[chat.uid]}
                            <button className="secondary" onClick={()=>openChat(chat)}>Chat</button>
                        </p>
                    )})
                }
            </div>
            {openChatBox && <Chat chatID={currentChatID} chatName={currentChatName} setOpenChatBox={setOpenChatBox} />}
        </>
    )
}