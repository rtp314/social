import { useEffect } from 'react';

export default function useClickOutside(ref: Node | null, callback: () => any) {
  function handleClick(event: Event) {
    if (ref && !ref.contains(event.target as Node)) {
      unsubscribe();
      callback();
    }
  }

  function activateClickAwayListener() {
    if (ref) window.addEventListener('click', handleClick);
  }

  function unsubscribe() {
    window.removeEventListener('click', handleClick);
  }

  useEffect(() => {
    return unsubscribe;
  }, []);

  return { unsubscribe, activateClickAwayListener };
}
