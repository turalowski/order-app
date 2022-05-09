import React from 'react';
import { Layout } from 'antd';
import {
  NavLink,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import { ReactComponent as RelationsIcon } from '../../assets/icons/relations.svg';
import { ReactComponent as StocksIcon } from '../../assets/icons/stocks.svg';
import { ReactComponent as CatalogsIcon } from '../../assets/icons/catalogs.svg';
import { ReactComponent as ProductsIcon } from '../../assets/icons/products.svg';
import { ReactComponent as TradesIcon } from '../../assets/icons/trades.svg';
import { ReactComponent as ReportsIcon } from '../../assets/icons/reports.svg';
import styles from './styles.module.scss';

const menuItems = [
  {
    to: '/relations',
    icon: <RelationsIcon />,
    label: 'Relations',
  },
  {
    to: '/stocks',
    icon: <StocksIcon />,
    label: 'Stocks',
  },
  {
    to: '/catalogs',
    icon: <CatalogsIcon />,
    label: 'Catalogs',
  },
  {
    to: '/products',
    icon: <ProductsIcon />,
    label: 'Products',
  },

  {
    to: '/trade',
    icon: <TradesIcon />,
    label: 'Trade',
  },
  {
    to: '/reports',
    icon: <ReportsIcon />,
    label: 'Reports',
  },
];

export const MainNavigation = () => {
  const { pathname } = useLocation();
  return (
    <Layout.Sider theme="dark" width={80} className={styles.Sidebar}>
      {menuItems.map(menuItem => {
        return (
          <li
            className={`${styles.item} ${
              pathname === menuItem.to ? styles.item_active : null
            }`}
          >
            <NavLink to={menuItem.to} className={`${styles.link}`}>
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </NavLink>
          </li>
        );
      })}
    </Layout.Sider>
  );
};
