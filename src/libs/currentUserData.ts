import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase_config";

export type MyData = {
	email: string;
	friends: {
		[uid: string]: string; //uid: email
	};
};

type MyDataBeforeLookup = {
	email: string;
	friends: string[]; // array of uids
};

let myUid: string;
let myData: MyData;
let myFriendsUids: string[] = [];

onAuthStateChanged(auth, (user) => {
	if (user) {
		myUid = user.uid;
		const ref = doc(db, "users", user.uid);
		onSnapshot(ref, handleSnapshot);
	} else {
	}
});

async function handleSnapshot(snapshot: DocumentSnapshot) {
	const newData = snapshot.data() as MyDataBeforeLookup;
	const friendUIDs: string[] = newData.friends;

	//check if this uid has already been looked up
	if (myFriendsUids.length === 0) {
		myFriendsUids = friendUIDs;
	} else {
		friendUIDs.forEach((uid) => {
			if (!myFriendsUids.includes(uid)) {
				myFriendsUids.push(uid);
			}
		});
	}

	//get all friend details
	const friendDetails = {};

	await Promise.all(
		myFriendsUids.map(
			(uid) =>
				new Promise<void>((resolve, reject) => {
					const docRef = doc(db, "users", uid);
					getDoc(docRef)
						.then((res) => res.get("email"))
						.then((email) => {
							friendDetails[uid] = email;
							resolve();
						})
						.catch((error) => {
							console.error(error);
							reject();
						});
				})
		)
	);
	// change myData.friends from an array of uids to an object containing uid:email pairs
	myData = { ...newData, friends: friendDetails };
}

export { myData, myUid };
