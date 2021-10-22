const express = require('express');
const { login } = require('./controllers/loginController');
const { userValidation } = require('./middlewares/userValidation');

const app = express();

app.use(express.json());

const PORT = 3000;

app.post('/login', userValidation, login)



app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${ PORT }`)
});