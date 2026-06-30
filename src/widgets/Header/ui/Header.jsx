import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Header.module.scss';
import { useGetMeQuery } from 'app/api/authApi';
import { rtkQueryApi } from 'app/api/rtkQueryApi';
import { useDispatch } from 'react-redux';
import { SearchInput } from 'features/search/ui/SearchInput';

export const Header = () => {
  return (
    <div className={styles.root}>
      <Link className={styles.logo} to="/">
        <div>Medimi BLOG</div>
      </Link>
      <div className={styles.search}>
        <SearchInput />
      </div>
    </div>
  );
};
