import {useState, useEffect} from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase_config";

function useMessages({chatID}) {
    const [msgList, setMsgList] = useState([[]]);
    const [loading, setLoading] = useState(true)
    console.log("message retrieval from: " + chatID)

    function sortMessagesByDate(msgArray) {
        if (msgArray.length === 0) {
            return [[]]
        }
        const sortedMessages = [[msgArray[0]]];
        let dayIndex = 0;
        msgArray.forEach((msg, index) => {
            if (index === 0) { //skip the first one, it's already in the array
                return
            }
            if (msg.day === sortedMessages[dayIndex][0].day) {
                sortedMessages[dayIndex].push(msg)
            } else {
                dayIndex++;
                sortedMessages.push([msg])
            }
        })
        return sortedMessages
    }

    function updateMsgList(msgArray) {
        if (msgArray[0].length == 0) {
            return
        }
        setMsgList(prev => {
            console.log(prev)
            if (prev[0][0] == undefined) {
                return msgArray;
            }
            if (msgArray[0][0].day === prev[prev.length - 1][0].day) {
                const updatedMsgList = [...prev];
                updatedMsgList[updatedMsgList.length - 1].push(...msgArray[0]);
                updatedMsgList.push(...msgArray.slice(1))
                return updatedMsgList
            } else {
                return [...prev, ...msgArray]
            };
        })
    }

    useEffect(()=>{
        setLoading(true)
        const q = query(collection(db, "chats", chatID, "messages"), orderBy("date", "asc"))

        const unsubscribe = onSnapshot(q, (snapshot)=> {
            const update = snapshot.docChanges()
                .filter(change => change.type === "added")
                .map(change => change.doc.data())
                .map(msg => {return {...msg, day: msg.date.toDate().toDateString(), time: msg.date.toDate().toTimeString().slice(0,5)}})
            updateMsgList(sortMessagesByDate(update));
            setLoading(false);
        }, error => console.log(error));

        return ()=>unsubscribe() //unsubscribe on unload
    }, [])

    return [loading, msgList]
}

export default useMessages