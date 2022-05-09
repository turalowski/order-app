import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import NewCatalog from './NewCatalog';
import styles from './styles.module.scss';
import swal from '@sweetalert/with-react';
import { CustomButton, CustomTable } from '../../components';
import { FiDelete } from 'react-icons/fi';
import { useCatalogs } from '../../hooks';

export const Catalogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const { getCatalogs, deleteCatalog } = useCatalogs();

  const getCatalogsAndUpdateState = () => {
    getCatalogs()
      .then(response => response.json())
      .then(({ catalogs }) => {
        if (catalogs) {
          setCatalogs(catalogs);
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
                text: 'Are you sure to delete this catalog?',
                buttons: ['Cancel', 'Delete'],
                dangerMode: true,
              }).then(willDelete => {
                if (willDelete) {
                  deleteCatalog(data)
                    .then(response => response.json())
                    .then(({ id }) => {
                      if (!id) {
                        return message.error('Error is happened');
                      }
                      message.success('Catalog is deleted');
                      getCatalogsAndUpdateState();
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
  }, []);

  return (
    <Layout.Content>
      <NewCatalog
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        getCatalogsAndUpdateState={getCatalogsAndUpdateState}
      />
      <div className={styles.Catalogs}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <CustomButton type="primary" onClick={() => setIsVisible(true)}>
            New Catalogs
          </CustomButton>
        </div>
        <CustomTable
          dataSource={catalogs}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
