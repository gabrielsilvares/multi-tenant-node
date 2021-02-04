import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { clientRouter } from './client.routes';
import { contactRouter } from './contact.routes';
import { subscriberRouter } from './subscriber.routes';

const routes = Router();
const prefixRoutes = '/api/v1'

routes.use(`${prefixRoutes}/subscribers`, subscriberRouter);
routes.use(`${prefixRoutes}/auth`, authRouter);
routes.use(`${prefixRoutes}/users`, usersRouter);
routes.use(`${prefixRoutes}/clients`, clientRouter);
routes.use(`${prefixRoutes}/contacts`, contactRouter);

export default routes;
