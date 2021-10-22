const jwt = require('jsonwebtoken');

const secret = 'minhasenhasupersecreta' // não é boa prática essa senha estar hard coded assim, entretanto é somente para fins de estudo

const login = (req, res) => {
  const { username } = req.body;
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ username }, secret, jwtConfig);
  res.status(200).json({ token });
};

module.exports = { login }