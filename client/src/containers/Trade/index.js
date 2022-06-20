import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { CustomButton, CustomTable } from '../../components';
import NewOperation from './NewOperation';
import { useOperations, useProducts, useRelations } from '../../hooks';
import styles from './styles.module.scss';

export const Trade = () => {
  const [operations, setOperations] = useState([]);
  const [newOperationModalIsVisible, setNewOperationModalIsVisible] =
    useState(false);

  const [products, setProducts] = useState([]);
  const [relations, setRelations] = useState([]);

  const { getProducts } = useProducts();
  const { getRelations } = useRelations();
  const { getOperations } = useOperations();

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      align: 'left',
      width: 60,
      render: (_value, _item, index) => index + 1,
    },
    {
      title: 'Operation Type',
      dataIndex: 'type',
      align: 'left',
      render: value => (value === 1 ? 'Purchase' : 'Sales'),
    },

    {
      title: 'Operation date',
      dataIndex: 'createdAt',
      align: 'left',
      render: value => {
        const date = new Date(value);
        return date.toDateString();
      },
    },
    {
      title: 'Counterparty',
      dataIndex: 'counterparty',
      align: 'left',
      render: value => value.name,
    },
    {
      title: 'Invoice number',
      dataIndex: 'invoice',
      align: 'left',
    },
    {
      title: 'Price',
      dataIndex: 'products',
      align: 'left',
      render: value => {
        const totalPrice = value.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue.price * currentValue.amount;
        }, 0);
        return <span style={{ fontWeight: 700 }}>{totalPrice} PLN</span>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
    },
  ];

  const getRelationsAndUpdateState = () => {
    getRelations()
      .then(response => response.json())
      .then(({ relations }) => {
        if (relations) {
          setRelations(relations);
        }
      });
  };

  const getProductsAndUpdateState = () => {
    getProducts()
      .then(response => response.json())
      .then(({ products }) => {
        if (products) {
          setProducts(products);
        }
      });
  };

  const getOperationsAndUpdateState = () => {
    getOperations()
      .then(response => response.json())
      .then(({ operations }) => {
        if (operations) {
          setOperations(operations);
        }
      });
  };

  useEffect(() => {
    getRelationsAndUpdateState();
    getProductsAndUpdateState();
    getOperationsAndUpdateState();
  }, []);
  return (
    <Layout.Content>
      <NewOperation
        products={products}
        relations={relations}
        isVisible={newOperationModalIsVisible}
        setIsVisible={setNewOperationModalIsVisible}
        getOperationsAndUpdateState={getOperationsAndUpdateState}
      />
      <div className={styles.Trade}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <CustomButton
            type="primary"
            onClick={() => setNewOperationModalIsVisible(true)}
          >
            New Operation
          </CustomButton>
        </div>
        <CustomTable
          dataSource={operations}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
