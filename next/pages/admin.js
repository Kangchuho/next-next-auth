import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import useRequest from '../hooks/use-request';
import useRequest2 from '../hooks/currentuser';
import Cookies from 'cookies';
import cookieCutter from 'cookie-cutter';
import Layout from './../layouts/Layout';

const Admin = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/user', {
          credentials: 'include',
        });
        const content = await response.json();
        console.log(content);
        //로그인 상태
        if (content.id > 0) {
          await setAuth(true);
        } else {
          await setAuth(false);
        }
      } catch (error) {
        //로그아웃 상태
        await setAuth(false);
      }
    })();
  });

  const isLogin2 = false;
  //console.log('message', message);
  //const [isLogin, setIsLogin] = useState(false);
  function checkLogin() {
    axios.get('/api/isLogin').then((res) => {
      if (res.status === 200 && res.data.name) {
        //로그인 상태
        //console.log('res.data.name', res.data.name);
        //setIsLogin(true);
      } else {
        //로그아웃 상태
        router.push('/login');
      }
    });
  }

  // function Logout() {
  //   axios.get('/api/logout');
  //   router.push('/');
  // }

  const logout = async (e) => {
    console.log('admin.auth', auth);
    e.preventDefault();
    console.log('logout call');
    await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    await router.push('/');
  };

  const { doRequest, isLogin } = useRequest({
    url: '/api/isLogin',
    method: 'get',
    onSuccess: () => {
      //router.push('/');
      //isLogin = true;
      // console.log(isLogin2);
      // console.log(isLogin);
    },
  });

  // useEffect(() => {
  //   //checkLogin();
  //   // setPending(true);
  //   // async () => {
  //   //   await doRequest();
  //   //   //isLogin = true;
  //   //   //console.log(isLogin);
  //   // };
  //   doRequest();
  //   // if (!isLogin) {
  //   //   //router.push('/login');
  //   // }
  // }, []);

  if (auth) {
    return (
      <Layout>
        admin page 입니다.&nbsp;
        <Badge bg="danger" style={{ cursor: 'pointer' }} onClick={logout}>
          Logout
        </Badge>
      </Layout>
    );
  } else {
    return <Layout></Layout>;
  }
};

export default Admin;

// Get a cookie nextJS client
// import cookieCutter from 'cookie-cutter';
// const accessToken = await cookieCutter.get('jwt');
// Set a cookie
//cookieCutter.set('myCookieName', 'some-value')
// Delete a cookie
//cookieCutter.set('myCookieName', '', { expires: new Date(0) })
