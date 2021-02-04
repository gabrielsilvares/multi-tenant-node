import { UserRepository } from '@repositories/implementations/UserRepository';
import { HashProvider } from '@providers/implementations/HashProvider';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AuthenticateUserController } from './AuthenticateUserController';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';

const userRepository = new UserRepository();

const hashProvider = new HashProvider()
const cacheProvider = new RedisCacheProvider();

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider, cacheProvider);

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserController }