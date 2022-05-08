import React from 'react';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import { ReactComponent as RelationsIcon } from '../../assets/icons/relations.svg';
import { ReactComponent as StocksIcon } from '../../assets/icons/stocks.svg';
import { ReactComponent as ProductsIcon } from '../../assets/icons/products.svg';
import { ReactComponent as TradeIcon } from '../../assets/icons/trade.svg';
import { ReactComponent as ReportsIcon } from '../../assets/icons/reports.svg';
import styles from './styles.module.scss';

const menuItems = [
  {
    to: '/relations',
    icon: <RelationsIcon />,
    label: 'relations',
  },
  {
    to: '/stocks',
    icon: <StocksIcon />,
    label: 'Stocks',
  },
  {
    to: '/products',
    icon: <ProductsIcon />,
    label: 'Products',
  },
  {
    to: '/trade',
    icon: <TradeIcon />,
    label: 'Trade',
  },
  {
    to: '/reports',
    icon: <ReportsIcon />,
    label: 'Reports',
  },
];
export const MainNavigation = () => {
  return (
    <Layout.Sider theme="dark" width={80} className={styles.Sidebar}>
      {menuItems.map(menuItem => (
        <li className={styles.item}>
          <NavLink
            to={menuItem.to}
            className={styles.link}
            activeClassName={styles.active}
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </NavLink>
        </li>
      ))}
    </Layout.Sider>
  );
};
