import React, { useState } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomButton, CustomTable } from '../../components';
import { useStocks } from '../../hooks';
const NewOperation = props => {
  const { isVisible, setIsVisible, relations, getStocksAndUpdateState } = props;
  const [selectedProducts, setSelectedProducts] = useState([]);
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

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      align: 'left',
      width: 60,
      render: (_value, _item, index) => index + 1,
    },
    {
      title: 'Product name',
      dataIndex: 'name',
      align: 'left',
    },

    {
      title: 'Price',
      dataIndex: 'address',
      align: 'left',
    },
    {
      title: 'Amount',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'Total price',
      dataIndex: 'description',
      align: 'left',
    },
  ];

  return (
    <Modal
      centered
      visible={isVisible}
      okText="Create"
      onOk={() => form.submit()}
      onCancel={() => setIsVisible(false)}
      width={700}
    >
      <h1>New Operation</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Operation type"
          name="operationType"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option key={1} value={1}>
              Purchase
            </Select.Option>
            <Select.Option key={2} value={2}>
              Sales
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Counterparty"
          name="counterparty"
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
      </Form>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <CustomButton type="primary">Add product</CustomButton>
      </div>
      <CustomTable
        dataSource={selectedProducts}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default NewOperation;
