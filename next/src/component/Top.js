import Gnb from './Gnb';
import styles from './ItemList.module.css';

function Top(props) {
  return (
    <div>
      <div className={styles.txt_info}>
        <Gnb auth={props.auth} />
      </div>
    </div>
  );
}

export default Top;
