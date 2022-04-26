import Head from 'next/head';
import Image from 'next/image';
import ItemList from '../src/component/ItemList';
import styles from '../styles/Home.module.css';
import { Stack, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../layouts/Layout';

export default function Home({ products }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/user', {
          credentials: 'include',
        });
        const content = await response.json();
        //console.log(content);
        //로그인 상태
        if (content.id > 0) await setAuth(true);
        else await setAuth(false);
      } catch (error) {
        //로그아웃 상태
        await setAuth(false);
      }
    })();
  });

  // if (router.isFallback) {
  //   return (
  //     <div
  //       className="d-flex justify-content-center"
  //       style={{ padding: '100px 0' }}
  //     >
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }

  return (
    <Layout auth={auth}>
      <Head>
        <title>홈페이지에 오신것..</title>
      </Head>
      <Stack>
        <div>베스트 상품</div>
        <hr className="divider" />
      </Stack>
      <ItemList list={products.slice(0, 8)} />
      <Stack>
        <div>신상품 상품</div>
        <hr className="divider" />
      </Stack>
      <ItemList list={products.slice(8, 12)} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const API_URL = process.env.NETX_PUBLIC_API_URL;
  //console.log('API_URL', API_URL);
  const res = await axios.get(API_URL);
  const products = res.data;
  return {
    props: {
      products,
    },
    //revalidate: 20,
  };
};

/*
  정적생성
   - 빌드시점 생성
   - 모든 요청에 재사용
   - 성능이슈는 정적생성을 권장
   - getStaticProps, getStaticPaths
  서버사이드 렌더링
   - 최신상태
   - getServerSideProps ( revalidate: 20 사용치 않음)
*/
