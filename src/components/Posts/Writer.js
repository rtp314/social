var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { auth, db, storage } from "../../libs/firebase_config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import UploadedImage from "../UploadedImage";
export default function Writer() {
    const [newPost, setNewPost] = useState("");
    const [images, setImages] = useState([]);
    const fileUpload = useRef(null);
    function handleNewPost() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!auth.currentUser)
                return;
            const uploadedImagesUrls = [];
            let errored = false;
            //first, upload images and get urls of saved images
            if (images) {
                for (const imageElement of images) {
                    try {
                        const storageRef = ref(storage, `${auth.currentUser.uid}/${imageElement.name}`);
                        yield uploadBytes(storageRef, imageElement.raw);
                        const url = yield getDownloadURL(storageRef);
                        uploadedImagesUrls.push(url);
                    }
                    catch (error) {
                        console.error(error);
                        errored = true;
                    }
                }
            }
            //second, upload post
            if (!errored) {
                try {
                    yield addDoc(collection(db, "posts"), {
                        uid: auth.currentUser.uid,
                        body: newPost,
                        date: Timestamp.now(),
                        images: uploadedImagesUrls,
                    });
                    setNewPost("");
                    setImages([]);
                }
                catch (error) {
                    console.error(error);
                }
            }
        });
    }
    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const files = dt && dt.files;
        displayUploadedImage(files);
    }
    function handleUpload(e) {
        e.preventDefault();
        const files = e.target.files;
        files && displayUploadedImage(files);
    }
    function displayUploadedImage(files) {
        for (const file of files) {
            let imgSrc;
            const reader = new FileReader();
            reader.onload = () => {
                imgSrc = reader.result;
                setImages((prev) => [...prev, { name: file.name, data: imgSrc, raw: file }]);
            };
            reader.readAsDataURL(file);
        }
    }
    function handleDragOver(e) {
        e.preventDefault();
        console.log("object entered drop zone");
    }
    function deleteUploadedImage(name) {
        setImages((prev) => prev.filter((image) => image.name !== name));
    }
    return (React.createElement("div", { id: 'post-writer', onDragOver: handleDragOver, onDrop: handleDrop, className: 'writer post' },
        images.map((uploadedImage, index) => (React.createElement(UploadedImage, { key: index, imgSrc: uploadedImage.data, imgName: uploadedImage.name, deleteImage: deleteUploadedImage }))),
        React.createElement("input", { type: 'text', value: newPost, onChange: (e) => setNewPost(e.target.value), className: 'input', placeholder: "What's on your mind?" }),
        React.createElement("input", { type: 'file', ref: fileUpload, onChange: handleUpload, accept: 'image/*', hidden: true }),
        React.createElement("button", { className: 'button primary', onClick: handleNewPost, type: 'button' }, "Post"),
        React.createElement("button", { className: 'light', type: 'button', onClick: () => fileUpload.current && fileUpload.current.click() }, "Add Image")));
}
