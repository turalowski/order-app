import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import NewRelation from './NewRelation';
import styles from './styles.module.scss';
import swal from '@sweetalert/with-react';
import { CustomButton, CustomTable } from '../../components';
import { FiDelete } from 'react-icons/fi';
import { useRelations } from '../../hooks';

export const Relations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [relations, setRelations] = useState([]);
  const { getRelations, deleteRelation } = useRelations();

  const getRelationsAndUpdateState = () => {
    getRelations()
      .then(response => response.json())
      .then(({ relations }) => {
        if (relations) {
          setRelations(relations);
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
      width: 150,
      render: value => (value === 1 ? 'Legal Entity' : 'Company'),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'left',
      width: 150,
      render: values =>
        values
          .map(value => {
            if (value === 1) {
              return 'Seller';
            }
            if (value === 2) {
              return 'Buyer';
            }
            return 'Manufacturer';
          })
          .join(', '),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
      width: 180,
    },
    {
      title: 'Mobile number',
      dataIndex: 'phoneNumber',
      align: 'left',
      width: 180,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      align: 'left',
      width: 180,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      align: 'left',
      width: 180,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'left',
      width: 180,
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
                text: 'Are you sure to delete this relation?',
                buttons: ['Cancel', 'Delete'],
                dangerMode: true,
              }).then(willDelete => {
                if (willDelete) {
                  deleteRelation(data)
                    .then(response => response.json())
                    .then(({ id }) => {
                      if (!id) {
                        return message.error('Error is happened');
                      }
                      message.success('Relation is deleted');
                      getRelationsAndUpdateState();
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
    getRelationsAndUpdateState();
  }, []);

  return (
    <Layout.Content>
      <NewRelation
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        getRelationsAndUpdateState={getRelationsAndUpdateState}
      />
      <div className={styles.Relations}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <CustomButton type="primary" onClick={() => setIsVisible(true)}>
            New Relation
          </CustomButton>
        </div>
        <CustomTable
          dataSource={relations}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
