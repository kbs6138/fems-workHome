import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,

  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default AppSider;
