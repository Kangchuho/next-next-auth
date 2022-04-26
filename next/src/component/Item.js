import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const Item = ({ item }) => {
  const { id, name, price, image_link, description } = item;
  return (
    <div>
      <img src={image_link} alt={name} />
      <div>
        <strong>{name}</strong>
        <strong>${price}</strong>
      </div>
      <Button>구매하기</Button>
      <div>
        <p>{description}</p>
      </div>
      <Link href="/">
        <a> go back</a>
      </Link>
    </div>
  );
};

export default Item;
