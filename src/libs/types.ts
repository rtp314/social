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
