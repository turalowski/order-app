import React, { useState } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton } from '../../components';
import Barcode from 'react-barcode';
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
  const [barcode, setBarcode] = useState(undefined);

  const onFinish = values => {
    const {
      name,
      catalog,
      manufacturer,
      price,
      currency,
      measurement,
      barcode,
      description,
    } = values;

    const data = {
      name,
      catalog,
      manufacturer,
      currency,
      price,
      measurement,
      barcode,
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
      width={800}
    >
      <h1>New Product</h1>
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
            <Form.Item
              label="Catalog"
              name="catalog"
              rules={[{ required: true }]}
            >
              <Select>
                {catalogs.map(catalog => (
                  <Select.Option value={catalog._id}>
                    {catalog.name}
                  </Select.Option>
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
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
          </div>
          <div style={{ width: '100%' }}>
            <Form.Item label="Price">
              <Input.Group compact>
                <Form.Item
                  name="price"
                  noStyle
                  style={{ width: '100%' }}
                  rules={[{ required: true }]}
                >
                  <Input style={{ width: '80%' }} placeholder="Price" />
                </Form.Item>
                <Form.Item
                  name={'currency'}
                  noStyle
                  rules={[{ required: true }]}
                  initialValue="PLN"
                >
                  <Select placeholder="Select province" disabled>
                    <Select.Option value="PLN">PLN</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="Measurement unit"
              name="measurement"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={1}>Box</Select.Option>
                <Select.Option value={2}>Unit</Select.Option>
                <Select.Option value={3}>Kg</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Barcode"
              name="barcode"
              getValueFromEvent={event => {
                setBarcode(event.target.value);
                return event.target.value;
              }}
            >
              <CustomInput />
            </Form.Item>
            <Barcode value={barcode} />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default NewProduct;
