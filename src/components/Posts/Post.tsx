import React from "react";
import { getTimestamp } from "../../libs/utils";
import useAuthStatus from "../../libs/useAuthStatus";
import { myData } from "../../libs/currentUserData";

export default function Post({ post }) {
	const timestamp = getTimestamp(post.date);
	const { myID } = useAuthStatus();

	return (
		<div className='post'>
			<div className='post-title'>
				<span>{post.uid === myID ? "Me" : myData && myData?.friends[post.uid]}</span>
				<span>{timestamp}</span>
			</div>
			<div className='post-body'>
				{post.images && (
					<div>
						{post.images.map((url: string, i: number) => (
							<img key={i} alt={post.date + i} className='post-img' src={url} />
						))}
					</div>
				)}
				{post.body}
			</div>
		</div>
	);
}
