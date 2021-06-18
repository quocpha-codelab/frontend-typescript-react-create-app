import useMe from 'js/data/useMe';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

import LayoutStyle from './Layout.module.scss';

const MainLayout: React.FC = ({ children }) => {
  const { data, isLoading } = useMe();

  if (isLoading) return <>Loading...</>;
  if (data) {
    return (
      <div className={LayoutStyle.container}>
        <Header me={data} />
        <div className={LayoutStyle.content}>{children}</div>
        <Footer />
      </div>
    );
  }

  return <Redirect to="/sign-in" />;
};

export default MainLayout;
