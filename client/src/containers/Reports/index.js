import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import styles from './styles.module.scss';
import { CustomTable } from '../../components';
import { useReports } from '../../hooks';

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const { getReports } = useReports();

  const getReportsAndUpdateState = () => {
    getReports()
      .then(response => response.json())
      .then(({ reportsOfRelations }) => {
        if (reportsOfRelations) {
          const totalTurnover = reportsOfRelations.reduce(function (
            previousValue,
            currentValue
          ) {
            return previousValue + currentValue.totalTurnover;
          },
          0);
          const operationsCount = reportsOfRelations.reduce(function (
            previousValue,
            currentValue
          ) {
            return previousValue + currentValue.operationsCount;
          },
          0);
          setReports([
            ...reportsOfRelations,
            { totalTurnover, operationsCount, isTotal: true },
          ]);
        }
      });
  };
  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      align: 'left',
      width: 60,
      render: (_value, item, index) =>
        item.isTotal ? (
          <span style={{ fontWeight: 700 }}>Summary</span>
        ) : (
          index + 1
        ),
    },
    {
      title: 'Counterparty',
      dataIndex: 'name',
      align: 'center',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      render: (values, item) =>
        item.isTotal
          ? ''
          : values
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
      title: 'Total turnover',
      dataIndex: 'totalTurnover',
      align: 'center',
      render: (value, item) => (
        <span
          style={
            item.isTotal && value < 0
              ? { fontWeight: 700, color: 'red' }
              : item.isTotal && value > 0
              ? { fontWeight: 700, color: 'green' }
              : value < 0
              ? { fontWeight: 700, color: 'red' }
              : { fontWeight: 700, color: 'green' }
          }
        >
          {value} PLN
        </span>
      ),
    },
    {
      title: 'Operations count',
      dataIndex: 'operationsCount',
      align: 'center',
      render: (value, item) => (
        <span style={item.isTotal ? { fontWeight: 700 } : {}}>{value}</span>
      ),
    },
  ];

  useEffect(() => {
    getReportsAndUpdateState();
  }, []);

  return (
    <Layout.Content>
      <div className={styles.Reports}>
        <CustomTable
          dataSource={reports}
          columns={columns}
          pagination={false}
        />
      </div>
    </Layout.Content>
  );
};
