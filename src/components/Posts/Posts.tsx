import { getDocs, limit, onSnapshot, orderBy, query, startAfter, startAt } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { postsCollection } from '../../libs/firebase_config';
import { PostWithId } from '../../libs/types';
import LoadMore from './LoadMore';
import Post from './Post';
import PostSkeleton from './Post-Skeleton';

const postsPerPage = 5;

export default function Posts() {
  const [postsArray, setPostsArray] = useState<PostWithId[]>([]);
  const [noMorePosts, setNoMorePosts] = useState(false);
  // const [now, setNow] = useState<Date>(new Date());

  // useEffect(() => {
  // 	const interval = setInterval(() => setNow(new Date()), 5000);
  // 	return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const q = query(postsCollection, orderBy('date', 'desc'), limit(postsPerPage));

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

  const loadMorePosts = useCallback(async () => {
    console.log('loading');
    const startAfterDoc = postsArray[postsArray.length - 1].date;
    const q = query(postsCollection, orderBy('date', 'desc'), startAfter(startAfterDoc), limit(postsPerPage));
    const results = await getDocs(q);
    const newPosts = results.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    if (newPosts.length > 0) {
      setPostsArray(prev => [...prev, ...newPosts]);
    } else {
      setNoMorePosts(true);
    }
  }, [postsArray.length]);

  return (
    <div>
      {postsArray.length === 0 && <PostSkeleton />}
      {postsArray.map(post => (
        <Post post={post} key={post.id} />
      ))}
      {postsArray.length > 0 && <LoadMore callback={loadMorePosts} key={postsArray.length} noMorePosts={noMorePosts} />}
    </div>
  );
}
