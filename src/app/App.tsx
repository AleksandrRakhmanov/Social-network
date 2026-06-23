import { Route, Routes } from 'react-router-dom';

import { Header } from 'widgets/Header';
import { Home, FullPost, Registration, AddPost, Login } from 'pages';
import { useGetMeQuery } from './api/authApi';
import Sidebar from 'widgets/Sidebar/ui/Sidebar';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

function App() {
  const token = localStorage.getItem('token');
  useGetMeQuery(undefined, { skip: !token });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={250}>
        <Sidebar />
      </Sider>

      <Layout>
        <Header />
        <Content style={{ padding: '0 24px', marginTop: 24 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Registration />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
