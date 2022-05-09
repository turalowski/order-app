import React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useRelations } from '../../hooks';
const NewRelation = props => {
  const { isVisible, setIsVisible, getRelationsAndUpdateState } = props;
  const { addRelation } = useRelations();
  const [form] = Form.useForm();

  const onFinish = values => {
    const {
      name,
      type,
      category,
      company,
      position,
      iban,
      description,
      email,
      website,
      phoneNumber,
      address,
    } = values;

    const data = {
      name,
      type,
      category,
      company,
      position,
      iban,
      description,
      email,
      website,
      phoneNumber,
      address,
    };
    addRelation(data)
      .then(response => response.json())
      .then(({ msg }) => {
        if (msg) {
          return message.error(msg);
        }
        message.success('Relation is saved');
        getRelationsAndUpdateState();
        form.resetFields();
        setIsVisible(false);
      });
  };
  return (
    <Modal
      centered
      visible={isVisible}
      okText="Create"
      onOk={() => form.submit()}
      onCancel={() => setIsVisible(false)}
      width={800}
    >
      <h1>New Relation</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <div style={{ width: '100%', marginRight: '20px' }}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <CustomInput />
            </Form.Item>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                <Select.Option value={1}>Legal entity</Select.Option>
                <Select.Option value={2}>Company</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Select mode="multiple">
                <Select.Option value={1}>Seller</Select.Option>
                <Select.Option value={2}>Buyer</Select.Option>
                <Select.Option value={3}>Manufacturer</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </Form.Item>
            <Form.Item label="Position" name="position">
              <CustomInput />
            </Form.Item>
            <Form.Item label="IBAN" name="iban">
              <CustomInput />
            </Form.Item>
          </div>
          <div style={{ width: '100%' }}>
            <Form.Item label="Email address" name="email">
              <CustomInput type="email" />
            </Form.Item>
            <Form.Item label="Phone number" name="phoneNumber">
              <CustomInput />
            </Form.Item>
            <Form.Item label="Website" name="website">
              <CustomInput />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <CustomInput />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default NewRelation;
