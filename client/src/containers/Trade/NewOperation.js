import React, { useState } from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { CustomInput, CustomTable } from '../../components';
import { useOperations } from '../../hooks';
const NewOperation = props => {
  const {
    isVisible,
    setIsVisible,
    products,
    relations,
    getOperationsAndUpdateState,
  } = props;
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [operationType, setOperationType] = useState(undefined);
  const { addOperation } = useOperations();
  const [form] = Form.useForm();

  const onFinish = values => {
    const { counterparty, type, currency, description, invoice } = values;
    const products = selectedProducts.map(selectedProduct => ({
      product: selectedProduct._id,
      price: selectedProduct.price,
      amount: selectedProduct.amount,
    }));
    const data = {
      invoice,
      counterparty,
      description,
      type,
      currency,
      products,
    };

    addOperation(data)
      .then(response => response.json())
      .then(({ errors }) => {
        if (errors) {
          let errorMessages = errors.map(({ param, msg }) => ({
            name: param,
            errors: [msg],
          }));
          return form.setFields(errorMessages);
        }
        message.success('Operation is saved');
        getOperationsAndUpdateState();
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
      dataIndex: 'price',
      align: 'left',
      render: (value, row) => (
        <CustomInput
          style={{ width: '70%' }}
          value={value}
          onChange={event => onPriceChange(row._id, event.target.value)}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'left',
      render: (value, row) => (
        <CustomInput
          value={value}
          onChange={event => onAmountChange(row._id, event.target.value)}
        />
      ),
    },
    {
      title: 'Total price',
      dataIndex: 'price',
      align: 'left',
      render: (value, row) => (
        <span>
          {value * row?.amount} {'PLN'}
        </span>
      ),
    },
  ];

  const selectProduct = value => {
    const product = products.find(product => product._id === value);
    setSelectedProducts(prevSelectedProducts => [
      ...prevSelectedProducts,
      {
        ...product,
        amount: 1,
      },
    ]);
  };

  const onPriceChange = (productId, value) => {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.map(prevSelectedProduct => {
        if (prevSelectedProduct._id === productId) {
          return { ...prevSelectedProduct, price: value };
        }
        return prevSelectedProduct;
      })
    );
  };
  const onAmountChange = (productId, value) => {
    setSelectedProducts(prevSelectedProducts =>
      prevSelectedProducts.map(prevSelectedProduct => {
        if (prevSelectedProduct._id === productId) {
          return { ...prevSelectedProduct, amount: value };
        }
        return prevSelectedProduct;
      })
    );
  };
  return (
    <Modal
      centered
      visible={isVisible}
      okText="Create"
      onOk={() => form.submit()}
      onCancel={() => setIsVisible(false)}
      width={900}
    >
      <h1>New Operation</h1>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item label="Invoice number" name="invoice" required>
          <CustomInput placeholder="Invoice number" />
        </Form.Item>
        <Form.Item
          label="Operation type"
          name="type"
          getValueFromEvent={value => {
            setOperationType(value);
            form.setFieldsValue({
              counterparty: undefined,
            });
            return value;
          }}
          rules={[{ required: true }]}
        >
          <Select placeholder="Operation type">
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
          <Select placeholder="Counterparty">
            {relations
              .filter(relation =>
                operationType === 1
                  ? relation.category.includes(1)
                  : relation.category.includes(2)
              )
              .map(relation => (
                <Select.Option value={relation._id}>
                  {relation.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[{ required: true }]}
          initialValue="PLN"
        >
          <Select placeholder="Select currency" disabled>
            <Select.Option value="PLN">PLN</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Description" />
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
        <Select
          style={{ minWidth: '300px', marginLeft: 'auto' }}
          placeholder="Select product"
          value={null}
          onChange={selectProduct}
        >
          {products
            .filter(product => {
              const selectedProductIds = selectedProducts.map(
                selectedProduct => selectedProduct._id
              );
              return !selectedProductIds.includes(product._id);
            })
            .map(product => (
              <Select.Option value={product._id}>{product.name}</Select.Option>
            ))}
        </Select>
      </div>
      <CustomTable
        dataSource={selectedProducts}
        columns={columns}
        pagination={false}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <span style={{ fontWeight: 700 }}>
          Total price:{' '}
          {selectedProducts.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.price * currentValue.amount;
          }, 0)}{' '}
          PLN
        </span>
      </div>
    </Modal>
  );
};

export default NewOperation;
