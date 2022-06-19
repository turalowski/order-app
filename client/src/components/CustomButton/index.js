
import React from 'react';
import { Button } from 'antd';
import styles from './styles.module.scss';

export const CustomButton = ({ children, ...rest }) => {
  return (
    <Button className={styles.CustomButton} {...rest}>
      {children}
    </Button>
  );
};
