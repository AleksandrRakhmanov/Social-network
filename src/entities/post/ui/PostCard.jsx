import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Eye, Pencil, X, MessageSquare } from 'lucide-react';
import { DeletePostModal } from 'features/postCard/ui/DeletePostModal';
import styles from './PostCard.module.scss';
import { UserInfo } from 'shared/ui';
import { PostSkeleton } from './PostSkeleton';
import { useDeletePostMutation } from 'app/api/postApi';
import { Button, message, Tooltip } from 'antd';

export const PostCard = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onDeletePost = async () => {
    try {
      await deletePost(id).unwrap();
      setIsDeleteModalOpen(false);
      message.success('Пост успешно удален');
    } catch (e) {
      message.error('Не удалось удалить пост');
    }
  };

  const onCancelDeletePost = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Tooltip title="Редактировать статью">
            <Button
              type="text"
              shape="circle"
              icon={<Pencil size={20} />}
              onClick={() => navigate(`/posts/${id}/edit`)}
            />
          </Tooltip>

          <Tooltip title="Удалить статью">
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              type="text"
              shape="circle"
              icon={<X size={20} />}
            />
          </Tooltip>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <Eye size={18} />
              <span>{viewsCount}</span>
            </li>
            <li>
              <MessageSquare size={18} />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeletePostModal
          open={isDeleteModalOpen}
          onConfirm={onDeletePost}
          onCancel={onCancelDeletePost}
        />
      )}
    </div>
  );
};
