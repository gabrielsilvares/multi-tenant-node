import { ClientRepository } from '@repositories/implementations/ClientRepository';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';
import { CreateClientUseCase } from './CreateClientUseCase';
import { CreateClientController } from './CreateClientController';
import { SearchProvider } from '@providers/implementations/SearchProvider';

const redisCacheProvider = new RedisCacheProvider();
const searchProvider = new SearchProvider();
const clientRepository = new ClientRepository();

const createClientUsecase = new CreateClientUseCase(clientRepository, redisCacheProvider, searchProvider);

const createClientController = new CreateClientController(createClientUsecase);

export { createClientController }