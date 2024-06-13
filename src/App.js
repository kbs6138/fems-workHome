// App.js
import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Layouts/Header/Header';
import AppSider from './Layouts/Sider/Sider';
import AppMain from './Layouts/Main/Main';
import AppFooter from './Layouts/Footer/Footer';
import { ThemeProvider } from './Components/ThemeContext';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider />
        <Layout>
          <AppHeader />
          <AppMain />
          <AppFooter />
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
