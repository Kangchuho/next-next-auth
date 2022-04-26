export default function logout(req, res) {
  //res.setHeader('Set-Cookie', 'jwt=;Max-Age=0;HttpOnly,Secure');
  res.setHeader('Set-Cookie', `jwt=; path=/; expires=-1`);
  res.statusCode = 200;
  res.json({ message: 'ok' });
}
