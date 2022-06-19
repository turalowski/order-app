import React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useStocks } from '../../hooks';
const NewStock = props => {
  const { isVisible, setIsVisible, getStocksAndUpdateState } = props;
  const { addStock } = useStocks();
  const [form] = Form.useForm();

  const onFinish = values => {
    const { name, description, address } = values;

    const data = {
      name,
      description,
      address,
    };
    addStock(data)
      .then(response => response.json())
      .then(({ errors }) => {
        if (errors) {
          let errorMessages = errors.map(({ param, msg }) => ({
            name: param,
            errors: [msg],
          }));
          return form.setFields(errorMessages);
        }
        message.success('Stock is saved');
        getStocksAndUpdateState();
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
      width={500}
    >
      <h1>New Stock</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <CustomInput />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewStock;
