import Head from 'next/head';
import Item from '../../src/component/Item';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';

const Subitem = ({ product, name }) => {
  const router = useRouter();
  //console.log(router.isFallback);

  if (router.isFallback) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ padding: '100px 0' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    product && (
      <div>
        <Head>
          <title>{product.name}</title>
          <meta name="description" content={product.description}></meta>
        </Head>
        {name} 환경입니다.
        <Item item={product} />
      </div>
    )
  );
};

export default Subitem;

export const getStaticPaths = async () => {
  const API_URL = process.env.NETX_PUBLIC_API_URL;
  const res = await axios.get(API_URL);
  const products = res.data;

  return {
    // paths: [
    //   { params: { id: '740' } },
    //   { params: { id: '730' } },
    //   { params: { id: '729' } },
    // ],
    paths: products.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  if (id && id > 0) {
    const res = await axios.get(
      `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
    );
    const product = res.data;
    //console.log(product);
    return {
      props: {
        product,
        name: process.env.name,
      },
    };
  }
};

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   if (id && id > 0) {
//     const res = await fetch(
//       `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
//     );
//     const product = await res.json();
//     //console.log(product);
//     return {
//       props: {
//         product,
//       },
//       revalidate: 20,
//     };
//   }
// };
