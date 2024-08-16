import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './Layouts/Header/Header';
import AppSider from './Layouts/Sider/Sider';
import AppMain from './Layouts/Main/Main';
import AppFooter from './Layouts/Footer/Footer';
import { ThemeProvider } from './Components/ThemeContext';
import AppAdmin from './Layouts/Admin/Admin';
import MonitorFirst from './Components/ManagementMonitoring/FacilityManagementMonitoring';
import LeakageCurrentCurve from './Components/TrendCurves/LeakageCurrentCurve';
import OverCurrentTrendCurve from './Components/TrendCurves/OverCurrentTrendCurve';
import UnbalanceRatioCurve from './Components/TrendCurves/UnbalanceRatioCurve';
import { QueryClient, QueryClientProvider } from 'react-query';
import DiagramInfo from './Components/DiagramInfo/DiagramInfo';
import DiagramDetail from './Components/DiagramInfo/DiagramDetail/DiagramDetail';
import OverCurrentTrendCurveDay from './Components/TrendCurves/OverCurrentTrendCurveDay';
import OverCurrentTrendCurveMonth from './Components/TrendCurves/OverCurrentTrendCurveMonth';



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
                <Route path="/LeakageCurrentCurve" element={<LeakageCurrentCurve />} /> {/* 누설전류 */}
                <Route path="/OverCurrentTrendCurve" element={<OverCurrentTrendCurve />} /> {/* 과전류 */}
                <Route path="/OverCurrentTrendCurveDay" element={<OverCurrentTrendCurveDay />} /> {/* 과전류 일별 */}
                <Route path="/OverCurrentTrendCurveMonth" element={<OverCurrentTrendCurveMonth />} /> {/* 과전류 월별 */}
                <Route path="/UnbalanceRatioCurve" element={<UnbalanceRatioCurve />} /> {/* 불평형률 */}
                <Route path="/DiagramInfo" element={<DiagramInfo />} /> {/* 장비상세정보 */}
                <Route path="/DiagramDetail" element={<DiagramDetail />} />

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
