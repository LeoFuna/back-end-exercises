const jwt = require('jsonwebtoken');

const secret = 'minhasenhasupersecreta';

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, secret);
    next()
  } catch(error) {
    return res.status(404).json({ message: 'Invalid token' });
  }
};

module.exports = { auth };