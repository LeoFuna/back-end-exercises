const express = require('express');
const { getAllUsers, createUser, deleteAllUsers, getUserById, updateUserById } = require('./controllers/usersController');

const app = express();

app.use(express.json());

const PORT = 3000

app.listen(PORT, () => console.log(`Ouvindo a porta ${ PORT }`));

app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);

app.post('/users', createUser);

app.put('/users/:id', updateUserById);

app.delete('/users', deleteAllUsers);
