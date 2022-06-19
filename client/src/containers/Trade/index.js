import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { CustomButton, CustomTable } from '../../components';
import NewOperation from './NewOperation';
import { useProducts, useRelations } from '../../hooks';
import styles from './styles.module.scss';

export const Trade = () => {
  const [operations, setOperations] = useState([]);
  const [newOperationModalIsVisible, setNewOperationModalIsVisible] =
    useState(false);

  const [products, setProducts] = useState([]);
  const [relations, setRelations] = useState([]);

  const { getProducts } = useProducts();
  const { getRelations } = useRelations();

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
      dataIndex: 'name',
      align: 'left',
    },

    {
      title: 'Operation date',
      dataIndex: 'address',
      align: 'left',
    },
    {
      title: 'Counterparty',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'Invoice number',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'Price',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'Sales manager',
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

  useEffect(() => {
    getRelationsAndUpdateState();
    getProductsAndUpdateState();
  }, []);
  return (
    <Layout.Content>
      <NewOperation
        products={products}
        relations={relations}
        isVisible={newOperationModalIsVisible}
        setIsVisible={setNewOperationModalIsVisible}
        // getStocksAndUpdateState={getStocksAndUpdateState}
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
