import React, { useEffect, useRef, useState } from 'react';
import { getTimestamp } from '../../libs/utils';
import useAuthStatus from '../../libs/useAuthStatus';
import { PostWithId } from '../../libs/types';
//@ts-ignore
import dots from '../../images/dots.svg';
//@ts-ignore
import styles from './Post.module.scss';
import userDataStore from '../../stores/userData';
import useClickOutside from '../../libs/useClickOutside';
import { deleteDoc, doc } from 'firebase/firestore';
import { postsCollection } from '../../libs/firebase_config';

interface Props {
  post: PostWithId;
}

export default function Post({ post }: Props) {
  const myData = userDataStore(state => state.userData);
  const timestamp = getTimestamp(post.date);
  const { myID } = useAuthStatus();

  return (
    <div className="post">
      <div className="post-title">
        <span>{post.uid === myID ? 'Me' : myData && myData.friends[post.uid]}</span>
        <div>
          {timestamp}
          <EditMenu id={post.id} />
        </div>
      </div>
      <div className="post-body">
        {post.images && (
          <div>
            {post.images.map((url, i) => (
              <img key={i} alt={post.date.toString() + i.toString()} className="post-img" src={url} />
            ))}
          </div>
        )}
        {post.body}
      </div>
    </div>
  );
}

function EditMenu({ id }: { id: string }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLSpanElement>(null);
  const { activateClickAwayListener } = useClickOutside(menuRef.current, () => setOpenMenu(false));

  function handleOpenMenu() {
    setOpenMenu(true);
    requestAnimationFrame(activateClickAwayListener);
  }

  return (
    <span className={styles.delete_menu} ref={menuRef}>
      <img src={dots} alt="edit post" onClick={handleOpenMenu} />
      {openMenu && <DeleteMenu id={id} />}
    </span>
  );
}

function DeleteMenu({ id }: { id: string }) {
  const [showDelete, setShowDelete] = useState(false);
  const confirmDelete = useRef<HTMLDivElement>(null);
  const { activateClickAwayListener } = useClickOutside(confirmDelete.current, () => setShowDelete(false));

  function handleClickDelete() {
    setShowDelete(true);
    requestAnimationFrame(activateClickAwayListener);
  }

  function handleConfirmDelete() {
    deleteDoc(doc(postsCollection, id));
  }

  return (
    <div className={styles.delete}>
      <span onClick={handleClickDelete}>Delete</span>
      <div ref={confirmDelete} onClick={handleConfirmDelete} className={showDelete ? styles.show_delete : ''}>
        Confirm Delete
      </div>
    </div>
  );
}
