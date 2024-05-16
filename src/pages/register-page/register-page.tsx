import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import { useStore } from '../../store/store';

import styles from './register-page.module.scss';

export const RegisterPage = () => {
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState({ email: '', password: '' });
  const login = useStore(state => state.login);

  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/register',
        values,
      );

      localStorage.setItem('token', response.data.accessToken);

      setError(null);
      setData({ email: '', password: '' });

      login(response.data.user);

      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const onFinishFailed = error => {
    console.log('onFinishFailed: ', error);
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.register}>
        <h2 className={styles.title}>Регистрация</h2>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Не валидный Email',
              },
              {
                required: true,
                message: 'Введите ваш Email',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Логин"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                min: 8,
                message: 'Минимум 8 символов',
              },
              {
                required: true,
                message: 'Введите ваш пароль',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Пароль"
              value={data.password}
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Регистрация
              </Button>
              или <Link to="/login">Войти</Link>
            </Space>
          </Form.Item>
          {error && <p className={styles.error}>{error}</p>}
        </Form>
      </div>
    </div>
  );
};
