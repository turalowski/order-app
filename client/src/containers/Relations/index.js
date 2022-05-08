import React from 'react';
import { Layout } from 'antd';
import NewRelation from './NewRelation';
import styles from './styles.module.scss';
import { CustomButton, CustomTable } from '../../components';

const dataSource = [
  {
    name: 'Company 1',
    type: 1,
    email: 'company1@outlook.com',
    phoneNumber: '+48515513743',
    website: 'company1.com',
    location: '10 Downing Street',
    description: 'This is company 1',
  },
  {
    name: 'Company 2',
    type: 2,
    email: 'company2@outlook.com',
    phoneNumber: '+48525523743',
    website: 'company2.com',
    location: '20 Downing Street',
    description: 'This is company 2',
  },
  {
    name: 'Company 3',
    type: 3,
    email: 'company3@outlook.com',
    phoneNumber: '+48535533743',
    website: 'company3.com',
    location: '30 Downing Street',
    description: 'This is company 3',
  },
  {
    name: 'Company 4',
    type: 4,
    email: 'company4@outlook.com',
    phoneNumber: '+48545544744',
    website: 'company4.com',
    location: '40 Downing Street',
    description: 'This is company 4',
  },
  {
    name: 'Company 5',
    type: 5,
    email: 'company5@outlook.com',
    phoneNumber: '+58555555755',
    website: 'company5.com',
    location: '50 Downing Street',
    description: 'This is company 5',
  },
];

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
    width: 150,
  },
  {
    title: 'Relation type',
    dataIndex: 'type',
    align: 'left',
    width: 150,
    render: value => (value === 1 ? 'Legal Entity' : 'Company'),
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
    title: 'Location',
    dataIndex: 'location',
    align: 'left',
    width: 180,
  },
  {
    title: 'Description',
    dataIndex: 'location',
    align: 'left',
    width: 180,
  },
];

export const Relations = () => {
  return (
    <Layout.Content>
      <NewRelation />
      <div className={styles.Relations}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '20px',
          }}
        >
          <CustomButton type="primary">New Relation</CustomButton>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
