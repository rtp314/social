import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { auth, db } from "../libs/firebase_config";

export default function Writer() {
    const [newPost, setNewPost] = useState("");
    const fileUpload = useRef();

    async function handleNewPost(e) {
        e.preventDefault();
        const input = document.getElementById("writer-input")
        const msg = newPost;
        setNewPost("");
        await addDoc(collection(db, "posts"), {
            uid: auth.currentUser.uid,
            body: input.innerHTML,
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
        const append = document.getElementById("writer-input");
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
        <div id="append" onDragOver={handleDragOver} onDrop={handleDrop} className="writer post">
            <div id="writer-input" contentEditable="true">What's on your mind?</div>
            <input type="file" ref={fileUpload} onChange={handleUpload} hidden/>
            <button className="button primary" onClick={handleNewPost} type="button">Post</button>
            <button className="light" type="button" onClick={()=>fileUpload.current.click()}>Add Image</button>
        </div>
    )
}