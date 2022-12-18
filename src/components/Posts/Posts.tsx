import { limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { postsCollection } from "../../libs/firebase_config";
import { PostWithId } from "../../libs/types";
import Post from "./Post";
import PostSkeleton from "./Post-Skeleton";

export default function Posts() {
	const [postsArray, setPostsArray] = useState<PostWithId[]>([]);
	// const [now, setNow] = useState<Date>(new Date());

	// useEffect(() => {
	// 	const interval = setInterval(() => setNow(new Date()), 5000);
	// 	return () => clearInterval(interval);
	// }, []);

	useEffect(() => {
		const q = query(postsCollection, orderBy("date", "desc"), limit(10));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const update = snapshot
				.docChanges()
				.filter((change) => change.type === "added")
				.map((change) => ({ ...change.doc.data(), id: change.doc.id }));
			setPostsArray((prev) => [...update, ...prev]);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div>
			{postsArray.length === 0 && <PostSkeleton />}
			{postsArray.map((post, index) => (
				<Post post={post} key={index} />
			))}
		</div>
	);
}
