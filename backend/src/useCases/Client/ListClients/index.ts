import { ClientRepository } from '@repositories/implementations/ClientRepository';
import { ListClientsUseCase } from './ListClientsUseCase';
import { ListClientsController } from './ListClientsController';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();

const listClientsUsecase = new ListClientsUseCase(clientRepository, redisCacheProvider);

const listClientsController = new ListClientsController(listClientsUsecase);

export { listClientsController }