import React from 'react';
import { Input } from 'antd';
import styles from './styles.module.scss';

export const CustomInput = ({ ...rest }) => {
  return <Input className={styles.CustomInput} {...rest} />;
};
