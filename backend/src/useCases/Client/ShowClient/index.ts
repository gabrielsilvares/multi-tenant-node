import { ClientRepository } from '@repositories/implementations/ClientRepository';
import { ShowClientUseCase } from './ShowClientUseCase';
import { ShowClientController } from './ShowClientController';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();

const showClientsUsecase = new ShowClientUseCase(clientRepository, redisCacheProvider);

const showClientController = new ShowClientController(showClientsUsecase);

export { showClientController }