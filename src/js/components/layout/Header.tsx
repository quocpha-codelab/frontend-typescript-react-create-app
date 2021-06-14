import React from 'react';
import { Layout } from 'antd';

import LayoutStyle from './Layout.module.scss';

const Header = () => {
  const content = 'Header';
  return <Layout.Header className={LayoutStyle.header}>{content}</Layout.Header>;
};

export default Header;
