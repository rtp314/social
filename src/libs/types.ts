import { Timestamp } from "firebase/firestore";

export type Post = {
	body: string; //actual post message
	date: Timestamp;
	images: string[]; //urls of images
	uid: string;
};

export type PostWithId = Post & {
	id: string;
};

export type MyData = {
	email: string;
	friends: {
		[uid: string]: string; //uid: email
	};
};
