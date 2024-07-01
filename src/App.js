import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './Layouts/Header/Header';
import AppSider from './Layouts/Sider/Sider';
import AppMain from './Layouts/Main/Main';
import AppFooter from './Layouts/Footer/Footer';
import { ThemeProvider } from './Components/ThemeContext';
import AppAdmin from './Layouts/Admin/Admin';
import MonitorFirst from './Components/Monitoring/01';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

const queryClient = new QueryClient(); 

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            <AppSider />
            <Layout>
              <AppHeader />
              <Routes>
                <Route path="/" element={<AppMain />} /> {/* 통합 모니터링 페이지 */}
                <Route path="/AppAdmin" element={<AppAdmin />} /> {/* 관리자 페이지 */}
                <Route path="/MonitorFirst" element={<MonitorFirst />} /> {/* 모니터링 페이지 */}
              </Routes>
              <AppFooter />
            </Layout>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
