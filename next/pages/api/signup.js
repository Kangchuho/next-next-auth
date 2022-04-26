import axios from 'axios';

export default function signup(req, res) {
  if (req.method === 'POST') {
    axios
      .post('http://localhost:3000/api/auth/signup', {
        username: 'test@test.com',
        password: '1234',
      })
      .then((res) => {
        //console.log(res.data);
      });
  }
}
