import React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useCatalogs } from '../../hooks';
const NewCatalog = props => {
  const { isVisible, setIsVisible, getCatalogsAndUpdateState } = props;
  const { addCatalog } = useCatalogs();
  const [form] = Form.useForm();

  const onFinish = values => {
    const { name, type, description } = values;

    const data = {
      name,
      type,
      description,
    };
    addCatalog(data)
      .then(response => response.json())
      .then(({ errors }) => {
        if (errors) {
          let errorMessages = errors.map(({ param, msg }) => ({
            name: param,
            errors: [msg],
          }));
          return form.setFields(errorMessages);
        }
        message.success('Catalog is saved');
        getCatalogsAndUpdateState();
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
      <h1>New Catalog</h1>
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
            <Select.Option value={1}>Product</Select.Option>
            <Select.Option value={2}>Service</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewCatalog;
