import React, { ReactNode } from 'react';
import { List, Avatar, Skeleton, Divider } from 'antd';
import { SideBlock } from 'shared/ui';

import { CommentItem } from 'entities/comment/model/types';

interface CommentsWidgetProps {
  items: CommentItem[];
  children?: ReactNode;
  isLoading?: boolean;
}

export const CommentsWidget: React.FC<CommentsWidgetProps> = ({
  items,
  children,
  isLoading = true,
}) => {
  return (
    <SideBlock title="Комментарии">
      <List
        dataSource={isLoading ? [...Array(5)] : items}
        renderItem={(item: CommentItem | undefined, index: number) => {
          if (isLoading || !item) {
            return (
              <React.Fragment key={index}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Skeleton.Avatar active size={40} shape="circle" />}
                    title={<Skeleton.Input active size="small" />}
                    description={<Skeleton.Input active size="small" />}
                  />
                </List.Item>
                <Divider />
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.user.avatarUrl}>
                      {item.user.fullName?.[0]}
                    </Avatar>
                  }
                  title={item.user.fullName}
                  description={item.text}
                />
              </List.Item>
              <Divider />
            </React.Fragment>
          );
        }}
      />
      {children}
    </SideBlock>
  );
};
