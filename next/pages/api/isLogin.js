import axios from 'axios';
import Cookies from 'cookies';

// export default function handler(req, res) {
//   res.status(200).json({ name: req.cookies.a_name });
// }

export default IsLogin = async (req, res) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res);
  // Get a cookie
  const accessToken = cookies.get('jwt');

  if (req.method === 'GET') {
    //console.log('req.headers', req.headers);
    //로그인 체크
    try {
      //console.log(accessToken);
      const response = await axios.get(
        'http://localhost:3000/api/auth/currentuser',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //console.log('response', response.data);
      res.status(200).json({ isLogin: true });
    } catch (err) {
      //res.status(err).json(err.response.data);
      //console.log('errrs', err);
      //res.status(err.response.data.statusCode).json(err.response.data);
      res.status(200).json({ isLogin: false });
    }
  }
};
