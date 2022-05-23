import { getDoc, doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useRef, useEffect, useState, useContext } from "react";
import { db } from "./firebase_config";
import useAuthStatus from "./useAuthStatus";

export const FriendsContext = createContext();

export function useFriends() {
    return useContext(FriendsContext)
};

export function FriendsContextProvider({children}) {
    const [loggedIn, myID] = useAuthStatus()
    const [friends, setFriends] = useState({});
    const cachedUidList = useRef([]);

    async function getFriendNames(uidArray) {
        const promises = [];
        const friendDetails = {};
        uidArray.forEach(uid => {
            promises.push(new Promise(resolve => {
                const docRef = doc(db, "users", uid);
                resolve(getDoc(docRef));
                }).then(res=>res.get("email"))
                  .then(email=>friendDetails[uid] = email)
                  .catch(error=>error)
            );
        })
        await Promise.all(promises);
        setFriends(friendDetails);
    }

    useEffect(()=>{
        if (loggedIn) {
            const ref = doc(db, "users", myID)

            const unsubscribe = onSnapshot(ref, (snapshot) => {
                //check if this uid has already been looked up
                const friendUIDs = snapshot.get("friends");
                if (cachedUidList.current.length === 0) {
                    cachedUidList.current = friendUIDs
                } else {
                    friendUIDs.forEach(uid => {
                        if (!cachedUidList.current.includes(uid)) {
                            cachedUidList.current.push(uid)
                        }
                    })
                }
                //get the details by looking up the uid
                getFriendNames(cachedUidList.current);
            });

            return ()=>unsubscribe()
        } else {
            setFriends({})
        }
    },[loggedIn])

    return (
        <FriendsContext.Provider value={friends}>
            {children}
        </FriendsContext.Provider>
    )
};