// Sider.jsx
import React, { useContext, useState } from 'react';
import { Layout, Menu, Switch } from 'antd';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../Components/ThemeContext';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    label: <Link to={link}>{label}</Link>,
  };
}

const items = [
  getItem('통합 모니터링', '1', <DesktopOutlined />, null, '/'),
  getItem('전류/과전류 일별 모니터링', '2', <PieChartOutlined />, null),
  getItem('관리/사용자 전환', 'sub1', <UserOutlined />, [
    getItem('관리자', '3', null, null, '/AppAdmin'),
    getItem('사용자', '4', null, null, ''),
  ]),
  getItem('통계 그래프', 'sub2', <UserOutlined />, [
    getItem('시간별 추이분석', '5', null, null, ''),
    getItem('일별 추이분석', '6', null, null, ''),
    getItem('월별 전력량 추이', '7', null, null, ''),
    getItem('15분 피크추이', '8', null, null, ''),
  ]),
  getItem('설비관리모니터링', 'sub3', <UserOutlined />, [
    getItem('장비1', '9', null, null, '/MonitorFirst'),
    getItem('장비2', '10', null, null, ''),
    getItem('장비3', '11', null, null, ''),
  ]),
];



const AppSider = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </div>
    </Sider>
  );
};

export default AppSider;
