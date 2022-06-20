import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import NewProduct from './NewProduct';
import styles from './styles.module.scss';
import swal from '@sweetalert/with-react';
import { CustomButton, CustomTable } from '../../components';
import { FiDelete } from 'react-icons/fi';
import { useCatalogs, useProducts, useRelations } from '../../hooks';

export const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [relations, setRelations] = useState([]);

  const { getCatalogs } = useCatalogs();
  const { getProducts, deleteProduct } = useProducts();
  const { getRelations } = useRelations();

  const getRelationsAndUpdateState = () => {
    getRelations()
      .then(response => response.json())
      .then(({ relations }) => {
        if (relations) {
          setRelations(relations);
        }
      });
  };

  const getCatalogsAndUpdateState = () => {
    getCatalogs()
      .then(response => response.json())
      .then(({ catalogs }) => {
        if (catalogs) {
          setCatalogs(catalogs);
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
  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      align: 'left',
      width: 60,
      render: (_value, _item, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: 'Catalog',
      dataIndex: 'catalog',
      align: 'left',
      render: value => value.name,
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      align: 'left',
      render: value => value.name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'left',
      render: (value, item, key) => (
        <span style={{ fontWeight: 700 }}>
          {value} {item.currency}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
    },
  ];

  useEffect(() => {
    getCatalogsAndUpdateState();
    getProductsAndUpdateState();
    getRelationsAndUpdateState();
  }, []);

  return (
    <Layout.Content>
      <NewProduct
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        getProductsAndUpdateState={getProductsAndUpdateState}
        catalogs={catalogs}
        relations={relations}
      />
      <div className={styles.Products}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <CustomButton type="primary" onClick={() => setIsVisible(true)}>
            New Product
          </CustomButton>
        </div>
        <CustomTable
          dataSource={products}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
