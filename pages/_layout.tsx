import React from 'react';
import Navbar from '../components/navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main >{children}</main>
      {/* Add a footer or any other content that should appear on all pages */}
    </>
  );
};

export default Layout;