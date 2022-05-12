import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../libs/firebase_config";

export default function Writer() {
    const [newPost, setNewPost] = useState("");

    async function handleNewPost(e) {
        e.preventDefault();
        const msg = newPost;
        setNewPost("");
        await addDoc(collection(db, "posts"), {
            uid: auth.currentUser.uid,
            body: msg,
            date: Timestamp.now(),
        })
    }

    return(
        <div className="writer">
            <form onSubmit={handleNewPost}>
                <input type="text" placeholder="Write Something" value={newPost} onChange={e => setNewPost(e.target.value)} />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}