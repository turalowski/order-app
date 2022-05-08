import React from 'react';
import { Table as AntTable, Row, Col } from 'antd';
import styles from './styles.module.scss';

export function CustomTable({
  footer,
  rowClassName = {},
  className,
  footerClassName,
  bordered = true,
  isWhiteTable = false,
  ...rest
}) {
  return (
    <div>
      <AntTable
        rowClassName={record => `${styles.row} ${rowClassName} ${
          record.isDeleted ? styles.deleted : {}
        }
        ${record.summaryRow ? styles.summaryRow : {}} `}
        className={`${className} ${styles.table} ${
          isWhiteTable ? styles.customWhiteTable : {}
        }`}
        pagination={false}
        scroll={{ x: 'max-content', y: 500 }}
        bordered={bordered}
        {...rest}
      />
      {footer ? (
        <div className={footerClassName || styles.footer}>{footer}</div>
      ) : null}
    </div>
  );
}

export function TableFooter({ mebleg, title = 'Ümumi məbləğ' }) {
  return (
    <Row style={{ fontWeight: 500 }}>
      <Col span={12}>{title}:</Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {mebleg}
      </Col>
    </Row>
  );
}
