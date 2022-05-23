import { doc, getDoc, collection, addDoc, Timestamp, updateDoc, setDoc, query, getDocs } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { auth, db } from "../libs/firebase_config";
import Chat from "./Chat";

export default function Sidebar() {
    const myID = auth.currentUser.uid;
    const [openChat, setOpenChat] = useState(false);
    const [friends, setFriends] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChatID, setCurrentChatID] = useState("")

    async function getFriends() {
        const docRef = doc(db, "users", myID); //this should probably be global context
        const myData = (await getDoc(docRef)).data();
        //get the friend list, and look up the emails by uid
        let promiseArray = [];
        myData.friends.forEach(uid => promiseArray.push(new Promise(resolve=> resolve(getDoc(doc(db,"users", uid))))));
        const responses = await Promise.all(promiseArray);
        const friends = responses.map((res, i) => {return {uid: myData.friends[i], email: res.get("email")}})
        setFriends(friends);

        //get the chat list
        const q = query(collection(db, "users", myID, "chats"))
        const chatData = await getDocs(q);
        let chatList = [];
        chatData.forEach(chat => {
            let data = chat.data();
            chatList.push({...data, users: data.users.filter(uid => uid !== myID)})
        })
        setChats(chatList)
    }

    async function startChat(uid) {
        //create new document in "chats"
        const newChatID = doc(collection(db, "chats"));
        await setDoc(newChatID, {})
        
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
        setChats(prev => [...prev, newChatID]);
        setOpenChat(true);
    }

    useEffect(()=>{
        getFriends();
    }, [])

    return (
        <>
        <div id="friends-list">
            {chats.map(chat=><p>{JSON.stringify(chat.users)}</p>)}
            {friends.map((friend, i) => <p key={i}>{friend.email}<button className="button btn-secondary" onClick={()=>startChat(friend.uid)}>Chat</button></p>)}
        </div>
        {openChat ? (
            <Chat chatID={currentChatID} />
        ) : (
            <button className="button btn-secondary" onClick={()=>setOpenChat(true)}>Open Chat</button>
        )}
        </>
    )
}