import React, { useState } from 'react';
import {
  DashboardOutlined,
  FieldTimeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CardPS from './cardPS';
const { Header, Sider, Content } = Layout;

const SiderMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider className='App' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <TableOutlined />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <FieldTimeOutlined />,
              label: 'Timers',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Another',
            },
            {
              key: '4',
              icon: <DashboardOutlined />,
              label: 'Statictics',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          что что еще
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        < CardPS/>  
        </Content>

      </Layout>
    </Layout>
  );
};

export default SiderMenu;