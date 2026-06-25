import React from 'react';
import { ClockPlus, Coffee } from 'lucide-react';
import { Row, Col, Tabs } from 'antd';

import { PostList } from 'widgets/PostList';
import { TagsWidget } from 'widgets/TagsWidget';
import { CommentsWidget } from 'widgets/CommentsWidget';
import { useGetPostsQuery } from 'app/api/postApi';
import { useGetTagsQuery } from 'app/api/tagApi';
import { useGetMeQuery } from 'app/api/authApi';

export const Home = () => {
  const { data: userData } = useGetMeQuery();

  const { data: posts, isLoading: isPostsLoading } = useGetPostsQuery();

  const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery();

  return (
    <>
      {/* Доработать Tabs. В children должен передаваться контент, который будет рендериться при выборе таба */}
      <Tabs
        defaultActiveKey="2"
        items={[ClockPlus, Coffee].map((Icon, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: i === 0 ? 'Новое' : 'Популярное',
            children: null,
            icon: <Icon />,
          };
        })}
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <PostList
            items={posts}
            isLoading={isPostsLoading}
            isEditable={userData?._id}
          />
        </Col>

        <Col xs={24} lg={8}>
          <TagsWidget items={tags} isLoading={isTagsLoading} />
          <CommentsWidget
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
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
          />
        </Col>
      </Row>
    </>
  );
};
