import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  EditOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { useGetMeQuery } from 'app/api/authApi';
import { LogoutButton } from 'features/logout';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useGetMeQuery();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Главная',
    },
    ...(userData
      ? [
          {
            key: '/add-post',
            icon: <EditOutlined />,
            label: 'Написать статью',
          },
          {
            key: '/settings',
            icon: <SettingOutlined />,
            label: 'Настройки',
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: <LogoutButton />,
          },
        ]
      : [
          {
            key: '/login',
            icon: <LoginOutlined />,
            label: 'Войти',
          },
          {
            key: '/register',
            icon: <UserAddOutlined />,
            label: 'Регистрация',
          },
        ]),
  ];

  const onClickMenuItem = (e: { key: string }) => {
    if (e.key === 'logout') return;
    navigate(e.key);
  };

  return (
    <div className={styles.sidebar}>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={onClickMenuItem}
        className={styles.menu}
      />

      {userData && (
        <div
          className={styles.userBlock}
          onClick={() => navigate(`/profile/${userData._id}`)}
        >
          <Avatar className={styles.avatar} src={userData.avatarUrl}>
            {userData.fullName?.[0]}
          </Avatar>
          <div className={styles.userInfo}>
            <span className={styles.fullName}>{userData.fullName}</span>
            <span className={styles.email}>{userData.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
