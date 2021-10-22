const jtw = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header.authorization;
  const decoded = jwt
};