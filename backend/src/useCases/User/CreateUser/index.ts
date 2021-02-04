import { UserRepository } from '@repositories/implementations/UserRepository';
import { HashProvider } from '@providers/implementations/HashProvider';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const hashProvider = new HashProvider()

const userRepository = new UserRepository();

const createUserUsecase = new CreateUserUseCase(userRepository, hashProvider);

const createUserController = new CreateUserController(createUserUsecase);

export { createUserController }