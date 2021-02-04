import { SubscriberRepository } from '@repositories/implementations/SubscriberRepository';
import { CreateSubscriberUseCase } from './CreateSubscriberUseCase';
import { CreateSubscriberController } from './CreateSubscriberController';
import { UserRepository } from '@repositories/implementations/UserRepository';

const subscriberRepository = new SubscriberRepository();
const userRepository = new UserRepository();

const createSubscriberUsecase = new CreateSubscriberUseCase(subscriberRepository, userRepository);

const createSubscriberController = new CreateSubscriberController(createSubscriberUsecase);

export { createSubscriberController }