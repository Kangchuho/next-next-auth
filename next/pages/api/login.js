import axios from 'axios';

export default Login = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        //credentials: include,
        {
          username,
          password,
        }
      );

      //직접쿠키생성이 필요없이 서버에서 해준다.. 원래는.. 크로스만 아니면..???
      /*
      const { accessToken } = response.data;
      //const { user }: { user: User } = response.data
      //const token = response.headers['set-cookie'];
      res.setHeader('Set-Cookie', `jwt=${accessToken}; path=/;`);
      //에러메시지도 같이 넘겨준다.
      res.status(200).json(response.data);
  
      */
      console.log('1111', '');
      res.end();
    } catch (err) {
      //res.status(err).json(err.response.data);
      //console.log(err.response.data);
      res.status(err.response.data.statusCode).json(err.response.data);
    }
  }
};

//export default login;
