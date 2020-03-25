const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Listar ONG'S
routes.get('/ongs', OngController.index);
// Criar ONG'S
routes.post('/ongs', OngController.create);
// Listar casos de apenas uma ONG
routes.get('/profile', ProfileController.index);
// Listar Casos
routes.get('/incidents', IncidentController.index);
// Criar Casos
routes.post('/incidents', IncidentController.create);
// Deleter Casos
routes.delete('/incidents/:id', IncidentController.delete);
module.exports = routes;