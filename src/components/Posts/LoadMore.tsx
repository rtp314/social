import { useEffect, useRef } from 'react';
import { useDebounce } from '../../libs/utilityHooks';

interface LoadMoreProps {
  callback: () => any;
  noMorePosts: boolean;
}

export default function LoadMore({ callback, noMorePosts }: LoadMoreProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { debounce, cancel } = useDebounce();

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          debounce(callback, 600);
        } else {
          cancel();
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, { threshold: [0, 1] });
    observer.observe(divRef.current as HTMLDivElement);
    return () => observer.disconnect();
  }, [callback]);

  return <div ref={divRef}>{noMorePosts ? 'No more posts!' : 'Loading more posts'}</div>;
}
