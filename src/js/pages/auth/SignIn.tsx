import { useHistory } from 'react-router-dom';
import { Card, Input, Button, Form, Row } from 'antd';
import { useMutation } from 'react-query';

import styles from './style.module.scss';

import { api, setToken } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';

export default function SignIn() {
  const history = useHistory();

  const navigateToSignUp = () => history.push('/sign-up');

  const { mutate: handleSignIn, isLoading } = useMutation(
    async (payload: any) => {
      const data = await api.post('auth/sign-in', { username: payload.username, password: payload.password });
      return data.data;
    },
    {
      onSuccess: (res) => {
        if (res.accessToken) {
          setToken(res.accessToken);
          history.push('/');
        }
      },
      onError: (error) => {
        showErrorMessage(error);
      },
    },
  );

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSignIn}>
          <Row justify="center">
            <h2>Sign In</h2>
          </Row>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit" disabled={isLoading}>
              Sign In
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToSignUp}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
