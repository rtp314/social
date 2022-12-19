import { limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { postsCollection } from '../../libs/firebase_config';
import { PostWithId } from '../../libs/types';
import Post from './Post';
import PostSkeleton from './Post-Skeleton';

export default function Posts() {
  const [postsArray, setPostsArray] = useState<PostWithId[]>([]);
  // const [now, setNow] = useState<Date>(new Date());

  // useEffect(() => {
  // 	const interval = setInterval(() => setNow(new Date()), 5000);
  // 	return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const q = query(postsCollection, orderBy('date', 'desc'), limit(10));

    const unsubscribe = onSnapshot(q, snapshot => {
      if (postsArray.length === 0) {
        setPostsArray(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } else {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            setPostsArray(prev => [{ ...change.doc.data(), id: change.doc.id }, ...prev]);
          } else if (change.type === 'removed') {
            setPostsArray(prev => prev.filter(doc => doc.id !== change.doc.id));
          }
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      {postsArray.length === 0 && <PostSkeleton />}
      {postsArray.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
