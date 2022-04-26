import { ListGroup, Form, Button, Stack } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import useRequest from '../hooks/use-request';
import Layout from './../layouts/Layout';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //회원로그인
  const loginActon = async () => {
    try {
      setErrors(null);

      await axios.post('/api/login', { username, password }).then((res1) => {
        if (res1.status === 200) {
          //로그인 성공
          //정해진 경로로 이동한다.
          //router.push('/admin');
          console.log('res1.data', res1.data);
          // const { accessToken } = res1.data;
          // res.setHeader('Set-Cookie', `session=${accessToken}`);
        }
      });
    } catch (err) {
      //로그인 실패
      //에러메시지를 리턴받아서 표기한다.
      console.log('err', err.response.data.message);
      let msgsub = '';
      if (
        !Array.isArray(err.response.data.message) ||
        !err.response.data.message.length
      ) {
        msgsub = <li>{err.response.data.message}</li>;
      } else {
        msgsub = err.response.data.message.map((e) => <li key={e}>{e}</li>);
      }

      setErrors(
        <div className="alert alert-danger">
          <h5>오류입니다.</h5>
          <ul className="my-0">{msgsub}</ul>
        </div>
      );

      //const { error, message, statusCode } = err.response.data;
      //alert(error + '\n' + statusCode + '\n' + message);
    }
  };

  //회원로그인2
  const { doRequest, errors } = useRequest({
    url: '/api/login',
    method: 'post',
    body: {
      username,
      password,
    },
    onSuccess: () => {
      //router.push('/');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    //await doRequest();

    await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    await router.push('/');
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center"
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Form style={{ width: '400px' }} onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              placeholder="UserName을 입력해주세요."
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />
            <Form.Text className="text-muted">
              접속자 계정 이름을 입력하시면 됩니다.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
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

          {errors}

          {/* <Button variant="primary" type="button" onClick={loginActon}>
            login
          </Button> */}
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
