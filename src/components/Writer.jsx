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

    function handleDrop(e) {
        console.log(e.dataTransfer)
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files)
    }

    function handleUpload(e) {
        e.preventDefault();
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        const append = document.getElementById("append");
        Array.from(files).forEach(file => {
            console.log(file)
            const img = document.createElement("img");
            img.file = file;
            append.appendChild(img)
            const reader = new FileReader();
            reader.onload = (e) => img.src = e.target.result;
            reader.readAsDataURL(file);
        })
    }

    function handleDragOver(e) {
        e.preventDefault();
        console.log("object entered drop zone")
    }

    return(
        <div id="append" className="writer post">
            <form onSubmit={handleNewPost}>
                <input onDragOver={handleDragOver}onDrop={handleDrop} type="text" placeholder="Write Something" value={newPost} onChange={e => setNewPost(e.target.value)} />
                <input type="file" onChange={handleUpload}/>
                <button className="button primary" type="submit">Post</button>
            </form>
        </div>
    )
}