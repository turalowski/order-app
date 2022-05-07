import React from 'react';
import { Form, Input, Button } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import styles from './style.module.scss';

export const Register = () => {
  return (
    <div className={styles.Register}>
      <h1>Register</h1>
      <div className={styles.formContainer}>
        <Form layout="vertical" style={{ width: '100%' }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true }]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            label="Email address"
            name="emailAddress"
            rules={[{ required: true }]}
          >
            <CustomInput type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <CustomInput type="password" />
          </Form.Item>
          <CustomButton type="primary" style={{ marginBottom: '10px' }} block>
            Register
          </CustomButton>
          <CustomButton block>Login</CustomButton>
        </Form>
      </div>
    </div>
  );
};
