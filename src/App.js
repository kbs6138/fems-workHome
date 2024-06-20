import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './Layouts/Header/Header';
import AppSider from './Layouts/Sider/Sider';
import AppMain from './Layouts/Main/Main';
import AppFooter from './Layouts/Footer/Footer';
import { ThemeProvider } from './Components/ThemeContext';
import AppAdmin from './Layouts/Admin/Admin';
import { QueryClient, QueryClientProvider } from 'react-query';

// 나머지 페이지 컴포넌트에 대한 주석 추가
// import CurrentMonitoring from './Pages/CurrentMonitoring';
// import Admin from './Pages/Admin';
// import User from './Pages/User';
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
              <Route path="/AppAdmin" element={<AppAdmin />} /> {/* 통합 모니터링 페이지 */}

              {/* 나머지 페이지 경로에 대한 주석 추가
              <Route path="/current-monitoring" element={<CurrentMonitoring />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element={<User />} />
               */}
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
