import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../libs/firebase_config";
import Post from "./Post";
import PostSkeleton from "./Post-Skeleton";

export default function Posts() {
    const [postsArray, setPostsArray] = useState([]);
    const [now, setNow] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(()=> setNow(new Date()), 5000)
        return ()=>clearInterval(interval)
    }, [])

    useEffect(()=>{
        const q = query(collection(db, "posts"), orderBy("date", "desc"), limit(10));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const update = snapshot.docChanges()
                .filter(change=>change.type === "added")
                .map(change => change.doc.data());
            setPostsArray(prev => [...prev, ...update]);
            console.log(update)
        })

        return ()=>unsubscribe();
    }, [])

    return(
        <div>
            {postsArray.length === 0 && <PostSkeleton />}
            {postsArray.map((post, index) => <Post now={now} post={post} key={index} />)}
        </div>
    )
}