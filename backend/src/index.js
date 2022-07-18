const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const error = require('./app/middlewares/error');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(error);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));

// O cors define os headers de resposta para todas as rotas - Aula Cross-Origin Resource Sharing
