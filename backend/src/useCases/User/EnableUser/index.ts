import { UserRepository } from '@repositories/implementations/UserRepository';
import { EnableUserUseCase } from './EnableUserUseCase';
import { EnableUserController } from './EnableUserController';

const userRepository = new UserRepository();

const enableUserUseCase = new EnableUserUseCase(userRepository);

const enableUserController = new EnableUserController(enableUserUseCase);

export { enableUserController }