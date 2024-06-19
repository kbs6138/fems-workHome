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
    getItem('사용자', '4', null, null, '/user'),
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
