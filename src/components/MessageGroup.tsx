import React from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "../libs/useMessages";

type MessageGroupProps = {
	msgGroup: Message[];
	user: string;
};

export default function MessageGroup({ msgGroup, user }: MessageGroupProps) {
	return (
		<div className='messagegroup'>
			<span className='timestamp'>{msgGroup[0].day}</span>
			{msgGroup.map((msg) => {
				return <ChatMessage msg={msg} user={user} />;
			})}
		</div>
	);
}
