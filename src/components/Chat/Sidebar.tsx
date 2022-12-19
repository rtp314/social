import { doc, collection, setDoc, query, getDocs } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../libs/firebase_config";
import { useTimeout } from "../../libs/utilityHooks";
import Chat from "./Chat";
import useMyData, { myUid } from "../../libs/currentUserData";
//@ts-ignore
import messageIcon from "../../images/message-svgrepo-com.svg";

type ChatType = {
	uid: string;
	chatID: string;
};

export default function Sidebar() {
	const [openChatBox, setOpenChatBox] = useState(false);
	const [openChatList, setOpenChatList] = useState(false);
	const [chats, setChats] = useState<ChatType[]>([]);
	const currentChatID = useRef("");
	const currentChatName = useRef("");
	const [uselessState, setUselessState] = useState(true);

	const { timeout } = useTimeout();
	const myData = useMyData();

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
			currentChatID.current = test.chatID;
			currentChatName.current = myData.friends[uid];
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

			currentChatID.current = newChatID;
			setChats((prev) => [...prev, { uid: uid, chatID: newChatID }]);
			currentChatName.current = myData.friends[uid];
			setOpenChatBox(true);
		}
	}

	function openOldChat(chat: ChatType) {
		if (!myData) return;
		currentChatID.current = chat.chatID;
		currentChatName.current = myData.friends[chat.uid];
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

	// useEffect(() => {
	// 	console.log("myData changed");
	// 	setLoadedData(myData);
	// 	console.log(myData);
	// }, [myData]);

	useEffect(() => console.log("rerendering"));

	useEffect(() => {
		getChatList();
	}, []); // eslint-disable-line -- This is definitely only going to be called once

	if (myData === undefined) {
		return (
			<div>
				Error
				<br />
				<button onClick={() => setUselessState((prev) => !prev)}>Retry</button>
			</div>
		);
	}

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
			{openChatBox && (
				<Chat
					chatID={currentChatID.current}
					chatName={currentChatName.current}
					setOpenChatBox={setOpenChatBox}
				/>
			)}
		</>
	);
}
