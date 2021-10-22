const express = require('express');
const { login } = require('./controllers/loginController');
const { userValidation } = require('./middlewares/userValidations');
const { errors } = require('./middlewares/errors'); 
const { auth } = require('./auth/auth');

const app = express();

app.use(express.json());

const PORT = 3001;

app.post('/login', userValidation, login)

app.get('/users', auth, )

app.use(errors)

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${ PORT }`)
});