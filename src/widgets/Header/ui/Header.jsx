import React from 'react';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { Button } from 'antd';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useGetMeQuery } from 'app/api/authApi';
import { rtkQueryApi } from 'app/api/rtkQueryApi';
import { useDispatch } from 'react-redux';

export const Header = () => {
  const dispatch = useDispatch();
  const { data: userData } = useGetMeQuery();

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      localStorage.removeItem('token');
      dispatch(rtkQueryApi.util.resetApiState());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Medimi BLOG</div>
          </Link>
        </div>
      </Container>
    </div>
  );
};
