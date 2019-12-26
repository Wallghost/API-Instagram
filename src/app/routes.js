import { Router } from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import authMiddleware from './middlewares/authMiddleware'

const routes = new Router();

routes.post('/user/create', UserController.create);

routes.get('/', AuthController.signin)

routes.use(authMiddleware)

export default routes;
