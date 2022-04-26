import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './ItemList.module.css';
import Link from 'next/link';

function ItemList({ list }) {
  return (
    <div>
      <Container>
        <Row>
          {list.map((item) => (
            <Col xs={12} md={6} lg={3} key={item.id}>
              <Link href={`/detail/${item.id}`}>
                <a>
                  <div className={styles.wrap}>
                    <img
                      src={item.image_link}
                      alt={item.name}
                      className={styles.img_item}
                    />
                    <strong className={styles.title_item}>{item.name}</strong>
                    <strong className={styles.txt_info}>
                      {item.category} {item.product_type}
                    </strong>
                    <strong className={styles.num_price}>${item.price}</strong>
                  </div>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ItemList;
