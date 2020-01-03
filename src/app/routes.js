import { Router } from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import PostsController from './controllers/PostsController';

import authMiddleware from './middlewares/authMiddleware';

const routes = new Router();

routes.post('/user/create', UserController.create);

routes.get('/', AuthController.signin);

routes.use(authMiddleware);

routes.put('/users/update', UserController.update);

routes.get('/feed', PostsController.feed);

export default routes;
