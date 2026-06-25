import React from 'react';
import { PostCard } from 'entities/post/ui/PostCard';

export const PostList = ({ items, isLoading, isEditable }) => {
  return (
    <>
      {(isLoading ? [...Array(5)] : items).map((obj, index) =>
        isLoading ? (
          <PostCard key={index} isLoading={true} />
        ) : (
          <PostCard
            id={obj._id}
            title={obj.title}
            imageUrl={`http://localhost:4444${obj?.imageUrl}`}
            user={obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={3}
            tags={obj.tags}
            isEditable={isEditable}
          />
        ),
      )}
    </>
  );
};
