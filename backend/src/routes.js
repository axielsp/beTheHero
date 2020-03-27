const express = require('express');
const { celebrate, Segments, Joi } = require ('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Listar ONG'S
routes.get('/ongs', OngController.index);
// Criar ONG'S
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    })
}), OngController.create);

// Listar casos de apenas uma ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// Listar Casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),  IncidentController.index);


// Criar Casos
routes.post('/incidents', IncidentController.create);
// Deleter Casos
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
       id: Joi.number().required(), 
    })
}), IncidentController.delete);

module.exports = routes;