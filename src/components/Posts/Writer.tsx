import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { auth, db, storage } from "../../libs/firebase_config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import UploadedImage from "../UploadedImage";

interface ImageFile {
	name: string;
	data: string;
	raw: File;
}

export default function Writer() {
	const [newPost, setNewPost] = useState("");
	const [images, setImages] = useState<ImageFile[]>([]);
	const fileUpload = useRef<HTMLInputElement>(null);
	const input = useRef<HTMLInputElement>(null);

	async function handleNewPost() {
		if (!auth.currentUser) return;
		const uploadedImagesUrls: string[] = [];
		let errored = false;
		//first, upload images and get urls of saved images
		if (images) {
			for (const imageElement of images) {
				try {
					const storageRef = ref(storage, `${auth.currentUser!.uid}/${imageElement.name}`);
					await uploadBytes(storageRef, imageElement.raw);
					const url = await getDownloadURL(storageRef);
					console.log(url);
					uploadedImagesUrls.push(url);
				} catch (error) {
					console.error(error);
					errored = true;
				}
			}
		}
		//second, upload post
		if (!errored) {
			const msg = newPost;
			setNewPost("");
			console.log(uploadedImagesUrls);
			await addDoc(collection(db, "posts"), {
				uid: auth.currentUser.uid,
				body: msg,
				date: Timestamp.now(),
				images: uploadedImagesUrls,
			});
			setImages([]);
		}
	}

	function handleDrop(e: React.DragEvent) {
		e.stopPropagation();
		e.preventDefault();
		const dt = e.dataTransfer;
		const files = dt && dt.files;
		displayUploadedImage(files);
	}

	function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const files = e.target.files;
		files && displayUploadedImage(files);
	}

	function displayUploadedImage(files: FileList) {
		for (const file of files) {
			let imgSrc: string;
			const reader = new FileReader();
			reader.onload = () => {
				imgSrc = reader.result as string;
				setImages((prev) => [...prev, { name: file.name, data: imgSrc, raw: file }]);
			};
			reader.readAsDataURL(file);
		}
	}

	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
		console.log("object entered drop zone");
	}

	function deleteUploadedImage(name: string) {
		setImages((prev) => prev.filter((image) => image.name !== name));
	}

	return (
		<div id='post-writer' onDragOver={handleDragOver} onDrop={handleDrop} className='writer post'>
			{images.map((uploadedImage, index) => (
				<UploadedImage
					imgSrc={uploadedImage.data}
					imgName={uploadedImage.name}
					deleteImage={deleteUploadedImage}
				/>
			))}
			<input
				type='text'
				ref={input}
				value={newPost}
				onChange={(e) => setNewPost(e.target.value)}
				className='input'
				placeholder="What's on your mind?"
			/>
			<input type='file' ref={fileUpload} onChange={handleUpload} accept='image/*' hidden />
			<button className='button primary' onClick={handleNewPost} type='button'>
				Post
			</button>
			<button className='light' type='button' onClick={() => fileUpload.current && fileUpload.current.click()}>
				Add Image
			</button>
		</div>
	);
}
