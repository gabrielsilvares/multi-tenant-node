import { Router } from 'express';
import { authenticateUserController } from '@useCases/User/AuthenticateUser';

const authRouter = Router();

authRouter.post('/login', (request, response) => {
  authenticateUserController.handle(request, response);
});

authRouter.post('/logout', (request, response) => {});
authRouter.post('/refresh', (request, response) => {});

export { authRouter };