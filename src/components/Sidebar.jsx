import { doc, getDoc } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { auth, db } from "../libs/firebase_config";
import Chat from "./Chat";

export default function Sidebar() {
    const [openChat, setOpenChat] = useState(false);
    const [friends, setFriends] = useState([]);

    async function getFriends() {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const friendUIDs = (await getDoc(docRef)).data().friends;
        let promiseArray = [];
        friendUIDs.forEach(uid => promiseArray.push(new Promise(resolve=> resolve(getDoc(doc(db,"users", uid))))));
        const responses = await Promise.all(promiseArray);
        const friends = responses.map(res => res.data().email)
        setFriends(friends);
    }

    useEffect(()=>{
        getFriends();
    }, [])

    return (
        <>
        <div id="friends-list">
            {friends.map(friend => <p>{friend}</p>)}
        </div>
        {openChat ? (
            <Chat />
        ) : (
            <button className="button btn-secondary" onClick={()=>setOpenChat(true)}>Open Chat</button>
        )}
        </>
    )
}