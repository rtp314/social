import { getDoc, doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useRef, useEffect, useState, useContext } from "react";
import { db } from "./firebase_config";
import useAuthStatus from "./useAuthStatus";

export const UserContext = createContext();

export function useUserData() {
    return useContext(UserContext)
};

export function UserContextProvider({children}) {
    const [loggedIn, myID] = useAuthStatus();
    const [myData, setMyData] = useState({});
    const cachedUidList = useRef([]);

    async function handleSnapshot(snapshot) {
        const newData = snapshot.data()
        const friendUIDs = newData.friends;

        //check if this uid has already been looked up
        if (cachedUidList.current.length === 0) {
            cachedUidList.current = friendUIDs
        } else {
            friendUIDs.forEach(uid => {
                if (!cachedUidList.current.includes(uid)) {
                    cachedUidList.current.push(uid)
                }
            })
        }

        //get all friend details
        const promises = [];
        const friendDetails = {};
        cachedUidList.current.forEach(uid => {
            promises.push(new Promise(resolve => {
                const docRef = doc(db, "users", uid);
                resolve(getDoc(docRef));
                }).then(res=>res.get("email"))
                  .then(email=>friendDetails[uid] = email)
                  .catch(error=>error)
            );
        })
        await Promise.all(promises);
        // change myData.friends from an array of uids to an object containing uid:email pairs
        setMyData({...newData, friends: friendDetails});
    }

    useEffect(()=>{
        if (loggedIn) {
            const ref = doc(db, "users", myID);
            const unsubscribe = onSnapshot(ref, handleSnapshot);
            return ()=>unsubscribe()
        } else {
            setMyData({});
        }
    },[loggedIn])

    return (
        <UserContext.Provider value={myData}>
            {children}
        </UserContext.Provider>
    )
};