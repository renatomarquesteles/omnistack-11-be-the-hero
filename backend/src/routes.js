import express from 'express';

import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';
import OngProfileController from './controllers/OngProfileController';
import SessionController from './controllers/SessionController';

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/profile', OngProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

export default routes;
