import React from 'react';
import { Form } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useAuth } from '../../hooks';
import styles from './style.module.scss';

export const Register = () => {
  const [form] = Form.useForm();
  const { register } = useAuth();

  const onFinish = values => {
    const { fullName, companyName, email, password } = values;
    if (fullName && companyName && email && password) {
      register(values)
        .then(response => response.json())
        .then(({ token, errors }) => {
          if (errors) {
            let errorMessages = errors.map(({ param, msg }) => ({
              name: param,
              errors: [msg],
            }));
            return form.setFields(errorMessages);
          }
          if (token) {
            localStorage.setItem('SMB_TOKEN', token);
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
          >
            Register
          </CustomButton>
          <CustomButton block>Login</CustomButton>
        </Form>
      </div>
    </div>
  );
};
