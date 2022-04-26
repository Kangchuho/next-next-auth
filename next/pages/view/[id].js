import Head from 'next/head';
import Item from '../../src/component/Item';
import axios from 'axios';

const Subitem = ({ product, name }) => {
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

export const getServerSideProps = async (context) => {
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

// export const getStaticPaths = async () => {
//   return {
//     paths: [{ params: { id: '1' } }],
//     fallback: true,
//   };
// };
