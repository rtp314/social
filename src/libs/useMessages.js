import {useState, useEffect} from "react";
import { doc, collection, query, onSnapshot, orderBy } from "firebase/firestore";

//

function useMessages({chatID}) {
    const [msgList, setMsgList] = useState([]);
    const [loading, setLoading] = useState(false)

    function sortMessagesByDate(msgArray) {
        if (msgArray.length < 2) {
            return msgArray
        };
        const sortedMessages = [[msgArray[0]]];
        let sortedIndex = 0;
        msgArray.forEach(msg => {
            if (msg.day === sortedMessages[sortedIndex][0].day) {
                sortedMessages[sortedIndex].push(msg)
            } else {
                sortedIndex++;
                sortedMessages.push([msg])
            }
        })
        return sortedMessages
    }

    function updateMsgList(msgArray) {
        if (msgArray.length < 1) {
            return
        }
        setMsgList(prev => {
            if (prev.length < 1) {
                return msgArray
            };
            if (msgArray[0][0].day === prev[prev.length - 1][0]?.day) {
                const updatedMsgList = prev;
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
        const q = query(collection(chatID, "messages"), orderBy("date", "asc"))

        const unsubscribe = onSnapshot(q, (snapshot)=> {
            const update = snapshot.docChanges()
                .filter(change => change.type === "added")
                .map(change => change.doc.data());

            updateMsgList(sortMessagesByDate(update));
            setLoading(false);
        });

        return ()=>unsubscribe() //unsubscribe on unload
    }, [])

    return [loading, msgList]
}

export default useMessages