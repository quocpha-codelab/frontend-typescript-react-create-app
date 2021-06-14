import { useHistory } from 'react-router-dom';
import { Card, Input, Button, Form, Row } from 'antd';
import { useMutation } from 'react-query';

import styles from './style.module.scss';

import { api, setToken } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';

export default function SignUp() {
  const history = useHistory();

  const navigateToSignIn = () => history.push('/sign-in');

  const { mutate: handleSignUp, isLoading } = useMutation(
    async (payload: any) => {
      const res = await api.post('auth/sign-up', {
        username: payload.username,
        password: payload.password,
        fullName: payload.fullName,
      });
      return res.data;
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
    <div className={styles.signUpContainer}>
      <Card bordered className={styles.signUpForm}>
        <Form onFinish={handleSignUp}>
          <Row justify="center">
            <h2>Sign Up</h2>
          </Row>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password Confirm"
            name="passwordConfirm"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
            dependencies={['password']}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit" disabled={isLoading}>
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToSignIn}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
