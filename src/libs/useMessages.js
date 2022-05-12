import {useState, useEffect, useRef} from "react";
import { doc, collection, getDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase_config";

//

function useMessages() {
    const [msgList, setMsgList] = useState([]);

    const uidList = useRef([]);
    const cachedUidList = useRef([]);
    const cachedLookup = useRef({})


    async function getUserNames(uid) { //right now, usernames are just email addresses
        //all the following code is only useful in multi-user chats
        if (uidList.current === cachedUidList.current) {
            return cachedLookup.current
        }

        console.log("callback running")

        //look up the unique uids, return an array of objects of type {uid, email}
        const promises = [];
        uidList.current.forEach(uid => {
            if (!cachedUidList.current.includes(uid)) {
                promises.push(new Promise(resolve => {
                    const docRef = doc(db, "users", uid);
                    resolve(getDoc(docRef));
                    }).then(res=>res.data().email)
                        .then(email=>{return {[uid]: email}}) //return {uid: email}
                        .catch(error=>error)
                );
            }
        })
        const newEmails = await Promise.all(promises); // resolves to array: [{uid, email}, {uid, email}]

        newEmails.forEach(pair => cachedLookup.current = {...cachedLookup.current, ...pair});
        cachedUidList.current = uidList.current
        return cachedLookup.current;
    }

    useEffect(()=>{
        const q = query(collection(db, "messages"), orderBy("date", "asc"))

        const unsubscribe = onSnapshot(q, (snapshot)=> {
            const update = snapshot.docChanges()
                .filter(change => change.type === "added")
                .map(change => change.doc.data())
            
            update.forEach(msg => {
                if (!uidList.current.includes(msg.uid)) {
                    uidList.current.push(msg.uid);
                }
            });
            getUserNames(uidList.current) //returns email lookup object
                .then(lookup => update.map(msg => {return {...msg, name: lookup[msg.uid]}}))
                .then(formatted => setMsgList(prev => [...prev, ...formatted]));
        });

        return ()=>unsubscribe() //unsubscribe on unload
    }, [])

    return msgList
}

export default useMessages