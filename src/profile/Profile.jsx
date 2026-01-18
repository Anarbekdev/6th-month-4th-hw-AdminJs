import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCategoriesStore } from '../store/categoryStore';
import { Card, Form, Input, Button, List, Divider, Typography } from 'antd';

const { Title, Text } = Typography;

export const Profile = () => {
  const { getProfile, profile, logout } = useAuthStore();
  const { getCategories, categories, createCategory } = useCategoriesStore();
  const [title, setTitle] = useState('');

  useEffect(() => {
    getProfile();
    getCategories();
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    if (!title) return;
    createCategory(title);
    setTitle('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
      <Title level={2}>My Profile</Title>

      {profile && (
        <Card style={{ marginBottom: 20 }}>
          <Text><b>Username:</b> {profile.username}</Text>
          <br />
          <Text><b>Email:</b> {profile.email}</Text>
        </Card>
      )}

      <Divider orientation="left">Categories</Divider>

      <Form layout="inline" onFinish={Submit} style={{ marginBottom: 20 }}>
        <Form.Item>
          <Input
            placeholder="Create category"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>

      <List
        bordered
        dataSource={categories}
        renderItem={(cat) => <List.Item key={cat.id}>{cat.title}</List.Item>}
        style={{ marginBottom: 20 }}
      />

      <Divider />

      <Button type="primary" danger onClick={logout}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};
