import { getDoc, doc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import React, { createContext, useRef, useEffect, useState, useContext } from "react";
import { db } from "./firebase_config";
import useAuthStatus from "./useAuthStatus";

export type MyData = {
	email: string;
	friends: object;
};

type MyDataBeforeLookup = {
	email: string;
	friends: string[];
};

//@ts-ignore
export const UserContext = createContext<MyData | undefined>();

export function useUserData() {
	return useContext(UserContext);
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
		const promises: Promise<string>[] = [];
		const friendDetails = {};
		cachedUidList.current.forEach((uid) => {
			promises.push(
				new Promise((resolve) => {
					const docRef = doc(db, "users", uid);
					resolve(getDoc(docRef));
				})
					//@ts-ignore
					.then((res) => res.get("email"))
					.then((email) => (friendDetails[uid] = email))
					.catch((error) => console.error(error))
			);
		});
		await Promise.all(promises);
		// change myData.friends from an array of uids to an object containing uid:email pairs
		setMyData({ ...newData, friends: friendDetails });
	}

	useEffect(() => {
		if (loggedIn) {
			const ref = doc(db, "users", myID);
			const unsubscribe = onSnapshot(ref, handleSnapshot);
			return () => unsubscribe();
		}
	}, [loggedIn, myID]);

	return <UserContext.Provider value={myData}>{children}</UserContext.Provider>;
}
