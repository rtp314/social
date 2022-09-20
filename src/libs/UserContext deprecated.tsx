import { getDoc, doc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import React, { createContext, useRef, useEffect, useState, useContext } from "react";
import { db } from "./firebase_config";
import useAuthStatus from "./useAuthStatus";

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

//@ts-ignore
export const UserContext = createContext<MyData | undefined>();

export function useUserData(): MyData | void {
	const myData = useContext(UserContext);
	if (myData) return myData as MyData;
	else console.error("user data undefined");
}

export function UserContextProvider({ children }) {
	const { loggedIn, myID } = useAuthStatus();
	const [myData, setMyData] = useState<MyData>();
	const cachedUidList = useRef<string[]>([]);

	async function handleSnapshot(snapshot: DocumentSnapshot) {
		const newData = snapshot.data() as MyDataBeforeLookup;
		const friendUIDs: string[] = newData.friends;

		//check if this uid has already been looked up
		if (cachedUidList.current.length === 0) {
			cachedUidList.current = friendUIDs;
		} else {
			friendUIDs.forEach((uid) => {
				if (!cachedUidList.current.includes(uid)) {
					cachedUidList.current.push(uid);
				}
			});
		}

		//get all friend details
		const friendDetails = {};

		await Promise.all(
			cachedUidList.current.map(
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
		setMyData({ ...newData, friends: friendDetails });
	}

	// subscribe to changes in current user's data
	useEffect(() => {
		if (loggedIn) {
			const ref = doc(db, "users", myID);
			const unsubscribe = onSnapshot(ref, handleSnapshot);
			return () => unsubscribe();
		}
	}, [loggedIn, myID]);

	return <UserContext.Provider value={myData}>{children}</UserContext.Provider>;
}
