// Sider.jsx
import React, { useContext, useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined, UserOutlined, FundOutlined, LineChartOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../Components/ThemeContext';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    label: link ? <Link to={link}>{label}</Link> : label,
  };
}

const items = [
  getItem('통합 모니터링', '1', <DesktopOutlined />, null, '/'),
  getItem('장비 상세정보', 'sub1', <DesktopOutlined />, [
    getItem('상세조회', '2', null, null, '/DiagramDetail'),
  ], '/DiagramInfo'),

  getItem('추이그래프', 'sub2', <LineChartOutlined />, [
    getItem(' 시간별 추이그래프', '3', null, null, '/OverCurrentTrendCurve'),
    getItem('일별 추이그래프', '4', null, null, '/OverCurrentTrendCurveDay'),
    getItem('월별 추이그래프', '5', null, null, '/OverCurrentTrendCurveMonth'),
    /*
    getItem('전류불평형률 추이그래프', '6', null, null, '/UnbalanceRatioCurve'),
    getItem('누설전류 추이그래프', '7', null, null, '/LeakageCurrentCurve'),
    */
    //getItem('15분 피크추이', '8', null, null, ''),
  ]),
  getItem('설비관리모니터링', 'sub3', <FundOutlined />, [
    getItem('장비1', '8', null, null, '/MonitorFirst'),
    //getItem('장비2', '8', null, null, ''),
    //getItem('장비3', '9', null, null, ''),
  ]),
  /*
    getItem('관리/사용자 전환', 'sub4', <UserOutlined />, [
      getItem('관리자', '9', null, null, '/AppAdmin'),
      getItem('사용자', '10', null, null, ''),
    ]),*/
];

const AppSider = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme={isDarkMode ? 'dark' : 'light'}
    >
      <div className="demo-logo-vertical" />
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        theme={isDarkMode ? 'light' : 'dark'}
      />
    </Sider>
  );
};

export default AppSider;
