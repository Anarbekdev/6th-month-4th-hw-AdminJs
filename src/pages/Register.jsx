import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

export const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { register, isLoading, error } = useAuthStore();

  const onFinish = async (values) => {
    try {
      await register(values);
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("Ошибка регистрации: " + err.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
        <h2>Регистрация🤠</h2>
      <Form form={form} name="register_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          className={styles.formItem}
          rules={[
            { required: true, message: "Please input your email" },
            { type: "email", message: "The input is not valid E-mail" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="username"
          className={styles.formItem}
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          className={styles.formItem}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
         <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item className={styles.formItem} shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className={styles.submitButton}
            >
              Register
            </Button>
          )}
        </Form.Item>

        {/* Ссылка на Login */}
        <p className={styles.switchText}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>

        {/* Ошибка из store */}
        {error && <p className={styles.switchText} style={{ color: "red" }}>{error}</p>}
      </Form>
    </div>
  );
};
