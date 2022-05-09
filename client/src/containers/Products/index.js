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
      title: 'Type',
      dataIndex: 'type',
      align: 'left',
      render: value => <div>{value === 1 ? 'Product' : 'Service'}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
    },
    {
      title: 'Actions',
      width: 100,
      dataIndex: '_id',
      align: 'center',
      render: data => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiDelete
            size={20}
            color="#f05545"
            className={styles.deleteButton}
            onClick={() => {
              swal({
                title: 'Warning!',
                text: 'Are you sure to delete this product?',
                buttons: ['Cancel', 'Delete'],
                dangerMode: true,
              }).then(willDelete => {
                if (willDelete) {
                  deleteProduct(data)
                    .then(response => response.json())
                    .then(({ id }) => {
                      if (!id) {
                        return message.error('Error is happened');
                      }
                      message.success('Product is deleted');
                      getProductsAndUpdateState();
                    });
                }
              });
            }}
          />
        </div>
      ),
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
