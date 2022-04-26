import { ListGroup, Form, Button, Stack } from 'react-bootstrap';
import { Request, Response } from 'react';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();

  // const loginActon = () => {
  //   axios.post('/api/login').then((res1) => {
  //     if (res1.status === 200) {
  //       //로그인 성공
  //       //router.push('/admin');
  //       // console.log(res1.data);
  //       // const { accessToken } = res1.data;
  //       // res.setHeader('Set-Cookie', `session=${accessToken}`);
  //     } else {
  //       //로그인 실패
  //       alert('로그인 실패');
  //     }
  //   });
  // };
  const [errors, setErrors] = useState(null);

  const loginActon = async () => {
    const loginData = {
      username: 'test@test.com',
      password: '1234',
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        loginData
      );
      const { accessToken } = response.data;
      //console.log('accessToken', accessToken);
      //const { user }: { user: User } = response.data
      //const token = response.headers['set-cookie'];
      console.log('response', response);
      console.log('req', req);
      //response.setHeader('Set-Cookie', `jwt=${accessToken}; path=/;`);
    } catch (err) {
      console.log(err);
      // setErrors(
      //   <div className="alert alert-danger">
      //     <h4>Ooops....</h4>
      //     <ul className="my-0">
      //       {err.response.data.errors.map((err) => (
      //         <li key={err.message}>{err.message}</li>
      //       ))}
      //     </ul>
      //   </div>
      // );
    }
  };

  // const loginActon = () => {
  //   axios
  //     .post('http://localhost:3000/api/auth/signin', {
  //       username: 'test@test.com',
  //       password: '1234',
  //     })
  //     .then((res1) => {
  //       const { accessToken } = res1.data;

  //       if (accessToken) {
  //         res.setHeader('Set-Cookie', `session=${accessToken}`);
  //       }
  //     });
  // };

  function siginup() {
    axios.post('/api/signup');
  }

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ width: '100%', marginTop: '20px' }}
      >
        <Form style={{ width: '400px' }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" placeholder="UserName을 입력해주세요." />
            <Form.Text className="text-muted">
              접속자 계정 이름을 입력하시면 됩니다.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          {errors}

          <Button variant="primary" type="button" onClick={loginActon}>
            login
          </Button>
          <Button variant="primary" type="button" onClick={siginup}>
            signup
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
