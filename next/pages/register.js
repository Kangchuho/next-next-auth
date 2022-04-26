import { ListGroup, Form, Button, Stack } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import useRequest from '../hooks/use-request';
import Layout from './../layouts/Layout';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    await router.push('/login');
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center"
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Form style={{ width: '400px' }} onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="fromBasicName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="이름을 입력해주세요."
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />
            <Form.Text className="text-muted">
              접속자 계정 이름을 입력하시면 됩니다.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          {/* {errors} */}

          {/* <Button variant="primary" type="button" onClick={loginActon}>
            login
          </Button> */}
          <Button variant="primary" type="submit">
            등록
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
