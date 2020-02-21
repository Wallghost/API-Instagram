import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import PostsController from './controllers/PostsController';
import AvatarController from './controllers/AvatarController';

import authMiddleware from './middlewares/authMiddleware';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user/create', UserController.create);

routes.get('/', AuthController.signin);

routes.use(authMiddleware);

routes.put('/user/avatar', upload.single('file'), AvatarController.store);

routes.get('/user/profile', UserController.userProfile);

routes.put('/user/update', UserController.update);

routes.get('/feed', PostsController.feed);

routes.post('/posts/create', upload.single('file'), PostsController.store);

export default routes;
