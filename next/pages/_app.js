import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

/*

 페이지 전환시 레이이 아웃 유지
 페이지 전환시 상태값 유지
 componentDidCatch를 이용해서 커스텀 에러 헨들링
 데이터 페이지를 주입
 글로벌 CSS 선언
 Bootstrap v5.1.3 (https://getbootstrap.com/) 


  pageProps : 


 */
