import React from 'react';
import { Layout } from 'antd';


const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      Ant Design © {new Date().getFullYear()} Created by Ant UED & Made by SmSoft
    </Footer>
  );
};

export default AppFooter;
