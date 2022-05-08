import React from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { CustomInput, CustomButton } from '../../components';
const NewRelation = () => {
  const [form] = Form.useForm();

  const onFinish = () => {};
  return (
    <Modal visible={true} okText="Create">
      <h1>New Relation</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select>
            <Select.Option>Legal entity</Select.Option>
            <Select.Option>Company</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email"
          rules={[{ required: true }]}
        >
          <CustomInput type="email" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item label="Website" name="website" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true }]}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewRelation;
