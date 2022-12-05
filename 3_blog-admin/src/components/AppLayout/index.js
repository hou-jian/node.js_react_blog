import logo from '../../assets/logo.png'

import React, { memo, useState } from 'react'
import {
  DashboardOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout

const AppLayout = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  return (
    <Layout style={{
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg" onBreakpoint={setCollapsed}>
        <div style={{
          backgroundColor: '#fff',
          width: '100%',
          textAlign: 'center'
        }}>
          <img src={logo} alt="HouJI's博客管理系统" style={{
            width: '70%',
          }} />
        </div>
        <Menu
          style={{
            minHeight: '100vh'
          }}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/dashboard',
              icon: <DashboardOutlined />,
              label: '仪表盘',
            },
            {
              key: '/articles',
              icon: <FileTextOutlined />,
              label: '文章管理',
            },
            {
              key: '/tags',
              icon: <TagsOutlined />,
              label: '标签管理',
            },
            {
              key: '/comments',
              icon: <MessageOutlined />,
              label: '评论管理',
            }
          ]}
          onClick={({ key }) => {
            navigate(key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: '0 15px',
            backgroundColor: '#fff',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            overflowY: 'auto'
          }}
        >
          <div>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
})

export default AppLayout;