import React from 'react';
import { Form } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = values => {
    const { email, password } = values;
    if (email && password) {
      login(values)
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
            window.setTimeout(() => window.location.reload(), 0);
          }
        });
    }
  };

  return (
    <div className={styles.Login}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: '100%' }}
          onFinish={onFinish}
        >
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
            Login
          </CustomButton>
          <Link to="/register">
            <CustomButton block onC>
              Register
            </CustomButton>
          </Link>
        </Form>
      </div>
    </div>
  );
};
