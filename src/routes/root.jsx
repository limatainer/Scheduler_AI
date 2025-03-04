import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
const Root = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Root;
