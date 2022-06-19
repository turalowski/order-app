import React, { useContext } from 'react';
import { AuthContext } from '../../context';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import styles from './styles.module.scss';
import { CustomButton } from '../CustomButton';

export const MainHeader = () => {
  const { user } = useContext(AuthContext);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <span
              onClick={() => {
                localStorage.clear('SMB_TOKEN');
                window.setTimeout(() => window.location.reload(), 0);
              }}
            >
              Exit from the system
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <Layout.Header className={styles.MainHeader}>
      <div>{new Date().toDateString()}</div>
      <CustomButton
        type="primary"
        href="https://github.com/turalowski/ITAPP_ODD_MON_0730"
      >
        GitHub
      </CustomButton>
      <CustomButton
        type="primary"
        href="https://trello.com/b/IgG9bK96/itappoddmon0730"
      >
        Trello
      </CustomButton>

      <div className={styles.userInfo}>
        <div className={styles.user}>
          <span style={{ fontSize: '14px', marginBottom: '5px' }}>
            {user?.fullName}
          </span>
          <span>{user?.companyName}</span>
        </div>
        <Dropdown overlay={menu}>
          <Avatar size="large" src={user?.avatar} />
        </Dropdown>
      </div>
    </Layout.Header>
  );
};
