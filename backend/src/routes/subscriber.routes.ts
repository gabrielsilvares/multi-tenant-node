import { Router } from 'express';
import { createSubscriberController } from '@useCases/Subscriber/CreateSubscriber';
import Authenticated from '@middlewares/Authenticated';

const subscriberRouter = Router();

subscriberRouter.use(Authenticated);

subscriberRouter.post('/:id', async (request, response) => createSubscriberController.handle(request, response));

export { subscriberRouter };