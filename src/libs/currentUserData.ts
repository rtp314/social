import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { getDoc, doc, onSnapshot, DocumentSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
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

let unsubscribeFromUserData: Unsubscribe;
let myUid: string;
let myData: MyData;
let myFriendsUids: string[] = [];
let updateFunctions: ((update: MyData) => void)[] = [];

onAuthStateChanged(auth, (user) => {
	console.log("auth state changed");
	if (user) {
		myUid = user.uid;
		const ref = doc(db, "users", user.uid);
		unsubscribeFromUserData = onSnapshot(ref, handleSnapshot);
	} else if (unsubscribeFromUserData) {
		unsubscribeFromUserData();
		console.log("unsubscribed to user data");
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

	if (myFriendsUids.length === 0 || myFriendsUids[0] === "") return;
	console.log(myFriendsUids);

	//get all friend details
	const friendDetails: { [uid: string]: string } = {};

	try {
		await Promise.all(
			myFriendsUids.map(
				(uid) =>
					new Promise<void>((resolve, reject) => {
						try {
							const docRef = doc(db, `users/${uid}`);
							getDoc(docRef)
								.then((res) => res.get("email"))
								.then((email) => {
									friendDetails[uid] = email;
									resolve();
								});
						} catch (error) {
							console.error("Error fetching friend details");
							console.error(error);
							reject();
						}
					})
			)
		);
	} catch (error) {
		console.error(error);
	}
	myData = { ...newData, friends: friendDetails };
	updateFunctions.forEach((fn) => fn(myData));
	console.log(myData);
}

export default function useMyData() {
	const [state, setState] = useState(myData);

	useEffect(() => {
		setState(myData);
		updateFunctions.push(setState);
	}, [myData]);

	return state;
}

export { myData, myUid };
