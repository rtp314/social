import React, { useEffect, useState } from "react";
import { auth } from "../libs/firebase_config";
import useMessages from "../libs/useMessages";
import MessageGroup from "./MessageGroup";
import ChatWriter from "./ChatWriter";

type ChatProps = {
	chatID: string;
	chatName: string;
	setOpenChatBox: (a: boolean) => void;
};

export default function Chat({ chatID, chatName, setOpenChatBox }: ChatProps) {
	const [loading, msgList] = useMessages(chatID);
	const [showChat, setShowChat] = useState(true);

	useEffect(() => {
		if (showChat === true) {
			document.getElementById("chatBottom")?.scrollIntoView({ behavior: "auto" });
		}
	}, [msgList, showChat]);

	return (
		<div className='chatbox'>
			<div className='flex-between' onClick={() => setShowChat((prev) => !prev)}>
				<div>{chatName}</div>
				{showChat && (
					<div className='close' onClick={() => setOpenChatBox(false)}>
						X
					</div>
				)}
			</div>
			{showChat && (
				<>
					<div className='chat-messages'>
						{loading
							? "Loading messages"
							: msgList[0].length !== 0 &&
							  msgList.map((msgGroup, index) => (
									<MessageGroup
										user={auth.currentUser?.uid || "unknown"}
										msgGroup={msgGroup}
										key={index}
									/>
							  ))}

						<div id='chatBottom'></div>
					</div>
					<ChatWriter chatID={chatID} />
				</>
			)}
		</div>
	);
}
