//다이나믹 API 라우팅..

export default function handler(req, res) {
  res.status(200).json({ id: req.query.id });
}
