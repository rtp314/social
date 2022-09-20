import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../libs/firebase_config";
import { useTimeout } from "../libs/utilityHooks";
import Chat from "./Chat/Chat";
import { myUid, myData } from "../libs/useUserData";
//@ts-ignore
import messageIcon from "/images/message-svgrepo-com.svg";

type ChatType = {
	uid: string;
	chatID: string;
};

export default function Sidebar() {
	const [openChatBox, setOpenChatBox] = useState(false);
	const [openChatList, setOpenChatList] = useState(false);
	const { timeout } = useTimeout();
	const [chats, setChats] = useState<ChatType[]>([]);
	const [currentChatID, setCurrentChatID] = useState("");
	const [currentChatName, setCurrentChatName] = useState("");
	const friendsModal = useRef<HTMLDialogElement | null>(null);
	const circle = useRef<HTMLDivElement | null>(null);

	async function getChatList() {
		//get the chat list
		const q = query(collection(db, "users", myUid, "chats"));
		const chatData = await getDocs(q);
		let chatList: ChatType[] = [];

		// chatData format: [{chat_id: xxx, users: [yy, zz]}, {etc}]
		chatData.forEach((chat) => {
			let data = chat.data();
			let uid = chat.id;
			chatList.push({ uid: uid, chatID: data.chat_id });
		});
		//chatList format: [{uid: uid, chatID: chatID}, {...}]
		setChats(chatList);
	}

	async function startNewChat(uid: string) {
		if (!myData) return;
		friendsModal.current?.close();
		const test = chats.find((chat) => chat.uid === uid);

		if (test !== undefined) {
			setCurrentChatID(test.chatID);
			setCurrentChatName(myData.friends[uid]);
			setOpenChatBox(true);
		} else {
			console.log("creating new chat document");
			//create new document in "chats"
			const newChatID = doc(collection(db, "chats")).id;

			//add a new document to the "chats" collection of both users in chat
			await setDoc(doc(db, "users", myUid, "chats", uid), {
				chat_id: newChatID,
				users: [myUid, uid],
			});
			await setDoc(doc(db, "users", uid, "chats", myUid), {
				chat_id: newChatID,
				users: [myUid, uid],
			});

			setCurrentChatID(newChatID);
			setChats((prev) => [...prev, { uid: uid, chatID: newChatID }]);
			setCurrentChatName(myData.friends[uid]);
			setOpenChatBox(true);
		}
	}

	function openOldChat(chat: ChatType) {
		if (!myData) return;
		setCurrentChatID(chat.chatID);
		setCurrentChatName(myData.friends[chat.uid]);
		setOpenChatBox(true);
	}

	function showFriends() {
		if (friendsModal.current && typeof friendsModal.current.showModal === "function") {
			friendsModal.current.showModal();
		}
	}

	function animate() {
		if (circle.current) {
			circle.current.classList.add("circle-animate");
			timeout(() => circle.current?.classList.remove("circle-animate"), 700);
		}
	}

	function openChatApp() {
		if (openChatList === false) {
			animate();
			setOpenChatList(true);
		} else {
			setOpenChatList(false);
		}
	}

	useEffect(() => {
		getChatList();
	}, []); // eslint-disable-line -- This is definitely only going to be called once

	if (myData === undefined) return <div>Error</div>;

	return (
		<>
			<div id='friends-list'>
				<h3 className='align-center' onClick={openChatApp}>
					<img id='message-icon' src={messageIcon} alt='messages' />
					<div className='circle' ref={circle}></div>
					<span>&nbsp;{openChatList ? "Chats" : "Open Chat"}</span>
				</h3>

				{openChatList && (
					<>
						<div className='highlight secondary' onClick={showFriends}>
							New Chat
						</div>

						<dialog className='modal' ref={friendsModal}>
							<h3>Friends</h3>
							{typeof myData.friends === "object" &&
								Object.keys(myData.friends).map((uid, i) => {
									return (
										<div className='highlight' key={i} onClick={() => startNewChat(uid)}>
											{myData.friends[uid]}
										</div>
									);
								})}
							<button value='cancel' onClick={() => friendsModal.current?.close()}>
								Cancel
							</button>
						</dialog>

						{typeof myData.friends === "object" &&
							chats.length > 0 &&
							chats.map((chat, i) => {
								return (
									<div key={i} className='highlight' onClick={() => openOldChat(chat)}>
										{myData.friends[chat.uid]}
									</div>
								);
							})}
					</>
				)}
			</div>
			{openChatBox && <Chat chatID={currentChatID} chatName={currentChatName} setOpenChatBox={setOpenChatBox} />}
		</>
	);
}
