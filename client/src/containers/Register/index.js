import React, { useState } from 'react';
import { Form } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useAuth } from '../../hooks';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { register } = useAuth();

  const onFinish = values => {
    const { fullName, companyName, email, password } = values;
    if (fullName && companyName && email && password) {
      setIsLoading(true);
      register(values)
        .then(response => response.json())
        .then(({ token, errors }) => {
          setIsLoading(false);
          if (errors) {
            let errorMessages = errors.map(({ param, msg }) => ({
              name: param,
              errors: [msg],
            }));
            return form.setFields(errorMessages);
          }
          if (token) {
            localStorage.setItem('SMB_TOKEN', token);
            window.setTimeout(() => window.location.reload(), 0);
          }
        });
    }
  };
  return (
    <div className={styles.Register}>
      <h1>Register</h1>
      <div className={styles.formContainer}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: '100%' }}
          onFinish={onFinish}
        >
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
            name="email"
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
          <CustomButton
            type="primary"
            style={{ marginBottom: '10px' }}
            block
            onClick={() => form.submit()}
            loading={isLoading}
            
          >
            Register
          </CustomButton>
          <Link to="/login">
            <CustomButton block>Login</CustomButton>
          </Link>
        </Form>
      </div>
    </div>
  );
};
