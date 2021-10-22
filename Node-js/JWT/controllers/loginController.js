const jwt = require('jsonwebtoken');

const secret = 'minhasenhasupersecreta' // não é boa prática essa senha estar hard coded assim, entretanto é somente para fins de estudo

const respostaDoBanco = (username) => ({ // simulação de uma resposta do BD à query
  id: 1,
  username: username,
  admin: false,
  password: '12345',
});

const login = (req, res) => {
  const { username } = req.body;
  const userData = respostaDoBanco(username) // aqui seria algo como uma query para o banco de dados
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };
  const { password, ...userDataWithoutPassword } = userData;
  const token = jwt.sign(userDataWithoutPassword, secret, jwtConfig);
  res.status(200).json({ messsage: 'Usuário logado com sucesso!', token });
};

module.exports = { login }