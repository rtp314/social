import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { auth, db } from "../libs/firebase_config";
import useAuthStatus from "../libs/useAuthStatus";
import { useFriends } from "../libs/FriendsContext";
import Chat from "./Chat";

export default function Sidebar() {
    const myID = auth.currentUser.uid
    const [openChat, setOpenChat] = useState(false);
    const [chats, setChats] = useState([]);
    const [currentChatID, setCurrentChatID] = useState("")
    const [currentChatName, setCurrentChatName] = useState("")
    const friends = useFriends()

    async function getChatList() {
        //get the chat list
        const q = query(collection(db, "users", myID, "chats"))
        const chatData = await getDocs(q);
        let chatList = [];
        console.log("useEffect running")

        // chatData format: [{chat_id: xxx, users: [yy, zz]}, {...}]
        chatData.forEach(chat => {
            let data = chat.data();
            let uid = chat.id
            chatList.push({[uid]: data.chat_id})
        })
        //chatList format: [{uid: chat_id}, {...}]
        setChats(chatList)
        console.log("current list of chats: " + JSON.stringify(chats))
        console.log("current friend list: " + JSON.stringify(friends))
    }

    async function startChat(uid) {

        const test = chats.find(chat => chat.hasOwnProperty(uid))
        console.log("test = " + typeof test)

        if (test != undefined) {

            console.log("found old chat");
            setCurrentChatID(test[uid]);
            setCurrentChatName(friends[uid]);
            setOpenChat(true);

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
            setCurrentChatName(friends[uid]);
            setOpenChat(true);

        }
    }

    useEffect(()=>{
        getChatList();
    }, [])

    return (
        <>
        <div id="friends-list">
            {/* {chats.map(chat=><p>{JSON.stringify(chat.users)}</p>)} */}
            {Object.keys(friends).map((key, i) => <p key={i}>{friends[key]}<button className="button btn-secondary" onClick={()=>startChat(key)}>Chat</button></p>)}
        </div>
        {openChat && <Chat chatID={currentChatID} chatName={currentChatName}/>}
        </>
    )
}