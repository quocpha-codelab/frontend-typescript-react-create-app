import React from 'react';

import Footer from './Footer';
import Header from './Header';

import LayoutStyle from './Layout.module.scss';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={LayoutStyle.container}>
      <Header />
      <div className={LayoutStyle.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
