import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { auth, db, storage } from "../libs/firebase_config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function Writer() {
    const [newPost, setNewPost] = useState("");
    const [images, setImages] = useState([]);
    const fileUpload = useRef();
    const input = useRef();

    async function handleNewPost(e) {
        const uploadedImages = []
        //first, upload images
        for (let i=0; i<images.length; i++) {
            const storageRef = ref(storage, `${auth.currentUser.uid}/${images[i].name}`)
            console.log(images[i])
            const snapshot = await uploadBytes(storageRef, images[i])
            const url = await getDownloadURL(storageRef)
            uploadedImages.push(url)
        }

        //second, upload post
        const msg = newPost;
        setNewPost("");
        await addDoc(collection(db, "posts"), {
            uid: auth.currentUser.uid,
            body: input.current.value,
            date: Timestamp.now(),
            images: uploadedImages
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
        console.log(files)
        setImages(files)
        const append = document.getElementById("post-writer");
        Array.from(files).forEach(file => {
            console.log(file)
            const img = document.createElement("img");
            img.classList.add("post-img")
            img.file = file;
            append.insertBefore(img, input.current)
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
        <div id="post-writer" onDragOver={handleDragOver} onDrop={handleDrop} className="writer post">
            <input type="text" ref={input} className="input" placeholder="What's on your mind?" />
            <input type="file" ref={fileUpload} onChange={handleUpload} accept="image/*" hidden/>
            <button className="button primary" onClick={handleNewPost} type="button">Post</button>
            <button className="light" type="button" onClick={()=>fileUpload.current.click()}>Add Image</button>
        </div>
    )
}