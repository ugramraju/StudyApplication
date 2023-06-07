const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    let token = req.header('x-token');
    if (!token) {
      return res.status(400).json({ error: 'Token not found' });
    }
    let decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Invalid token' });
  }
};
