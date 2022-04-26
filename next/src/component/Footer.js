import React from 'react';
import styles from './ItemList.module.css';

function Footer(props) {
  return (
    <div className={styles.txt_info} style={{ marginTop: '20px' }}>
      Copyright @코딩앙마, All rights reserved.
    </div>
  );
}

export default Footer;
