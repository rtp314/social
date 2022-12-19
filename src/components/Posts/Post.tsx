import React, { useEffect, useRef, useState } from "react";
import { getTimestamp } from "../../libs/utils";
import useAuthStatus from "../../libs/useAuthStatus";
import { PostWithId } from "../../libs/types";
//@ts-ignore
import dots from "../../images/dots.svg";
import useMyData from "../../libs/currentUserData";
//@ts-ignore
import styles from "./Post.module.scss";

interface Props {
	post: PostWithId;
}

export default function Post({ post }: Props) {
	const myData = useMyData();
	const timestamp = getTimestamp(post.date);
	const { myID } = useAuthStatus();

	function handleEdit() {}

	return (
		<div className='post'>
			<div className='post-title'>
				<span>{post.uid === myID ? "Me" : myData && myData.friends[post.uid]}</span>
				<div>
					{timestamp}
					<span className={styles.delete_menu}>
						<img src={dots} alt='edit post' onClick={handleEdit} />
						<DeleteMenu />
					</span>
				</div>
			</div>
			<div className='post-body'>
				{post.images && (
					<div>
						{post.images.map((url, i) => (
							<img key={i} alt={post.date.toString() + i.toString()} className='post-img' src={url} />
						))}
					</div>
				)}
				{post.body}
			</div>
		</div>
	);
}

function DeleteMenu() {
	const [showDelete, setShowDelete] = useState(false);
	const confirmDelete = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showDelete === true) {
			window.addEventListener(
				"click",
				(event) => {
					if (event.currentTarget !== confirmDelete.current) {
						setShowDelete(false);
					}
				},
				{ once: true }
			);
		}
	}, [showDelete]);

	return (
		<div className={styles.delete}>
			<span onClick={() => setShowDelete(true)}>Delete</span>
			<div ref={confirmDelete} className={showDelete ? styles.show_delete : ""}>
				Confirm Delete
			</div>
		</div>
	);
}
