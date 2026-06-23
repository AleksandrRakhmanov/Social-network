import React from 'react';
import { PostCard } from '../entities/post/ui/PostCard';
import { CommentCreator } from '../features/commentCreator';
import { CommentsWidget } from '../widgets/CommentsWidget';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useGetPostQuery } from '../app/api/postApi';

export const FullPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery(id);

  if (isLoading) {
    return <PostCard isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <PostCard
        id={data?._id}
        title={data?.title}
        imageUrl={`http://localhost:4444${data?.imageUrl}`}
        user={data?.user}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={data?.commentsCount}
        tags={data?.tags}
        isFullPost
      >
        <ReactMarkdown children={data?.text} />
      </PostCard>
      <CommentsWidget
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <CommentCreator />
      </CommentsWidget>
    </>
  );
};
