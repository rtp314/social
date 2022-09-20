import React from "react";
import { Message } from "../../libs/useMessages";

interface Props {
	user: string;
	msg: Message;
}

export default function ChatMessage({ user, msg }: Props) {
	return (
		<div className={user !== msg.uid ? "sentMsg msg" : "receivedMsg msg"}>
			{/* {user === msg.uid || JSON.stringify(msg.name)} */}
			<span className='timestamp'>{msg.time}</span>
			{msg.msg}
		</div>
	);
}
