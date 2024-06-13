// Sider.jsx
import React, { useContext, useState } from 'react';
import { Layout, Menu, Switch } from 'antd';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../Components/ThemeContext';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('관리/사용자 전환', 'sub1', <UserOutlined />, [
    getItem('관리자', '3'),
    getItem('사용자', '4'),
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
