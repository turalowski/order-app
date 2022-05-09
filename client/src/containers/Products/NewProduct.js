import React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import { useProducts } from '../../hooks';
const NewProduct = props => {
  const {
    isVisible,
    setIsVisible,
    getProductsAndUpdateState,
    catalogs,
    relations,
  } = props;
  const { addProduct } = useProducts();
  const [form] = Form.useForm();

  const onFinish = values => {
    const { name, type, description } = values;

    const data = {
      name,
      type,
      description,
    };
    addProduct(data)
      .then(response => response.json())
      .then(({ msg }) => {
        if (msg) {
          return message.error(msg);
        }
        message.success('Product is saved');
        getProductsAndUpdateState();
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
      <h1>New Product</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item label="Catalog" name="catalog" rules={[{ required: true }]}>
          <Select>
            {catalogs.map(catalog => (
              <Select.Option value={catalog._id}>{catalog.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Manufacturer"
          name="manufacturer"
          rules={[{ required: true }]}
        >
          <Select>
            {relations
              .filter(relation => relation.category.includes(3))
              .map(catalog => (
                <Select.Option value={catalog._id}>
                  {catalog.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item
          label="Measurement unit"
          name="measurement_unit"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value={1}>Box</Select.Option>
            <Select.Option value={2}>Unit</Select.Option>
            <Select.Option value={3}>Kg</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Barcode" name="barcode">
          <CustomInput />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewProduct;
