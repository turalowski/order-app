import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import { Layout, Avatar } from 'antd';
import styles from './styles.module.scss';

export const MainHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout.Header className={styles.MainHeader}>
      <div>{new Date().toDateString()}</div>
      <div className={styles.userInfo}>
        <div className={styles.user}>
          <span style={{fontSize: '18px', marginBottom: '5px'}}>{user?.fullName}</span>
          <span>{user?.companyName}</span>
        </div>
        <Avatar src={user?.avatar} />
      </div>
    </Layout.Header>
  );
};
