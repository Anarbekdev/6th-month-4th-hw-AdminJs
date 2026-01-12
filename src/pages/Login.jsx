import React from "react";
import { Button, Form, Input } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css"; 
import {MailOutlined, LockOutlined} from '@ant-design/icons'

export const Login = () => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await login(values);
    navigate("/");
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Войти</h2>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
        placeholder="email"
          name="email"
          className={styles.formItem}
          rules={[
            { required: true, message: "Please input your email" },
            { type: "email", message: "The input is not valid E-mail" },
          ]}
        >
          <Input placeholder="email" prefix={<MailOutlined />}/>
        </Form.Item>

        <Form.Item
          name="password"
          className={styles.formItem}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item className={styles.formItem}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className={styles.submitButton}
          >
            Login
          </Button>
        </Form.Item>
        <p className={styles.switchText}>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>

        {error && (
          <Form.Item className={styles.formItem}>
            <p className={styles.errorText}>{error}</p>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
