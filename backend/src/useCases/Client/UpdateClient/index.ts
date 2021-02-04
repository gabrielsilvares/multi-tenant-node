import { ClientRepository } from '@repositories/implementations/ClientRepository';
import { UpdateClientUseCase } from './UpdateClientUseCase';
import { UpdateClientController } from './UpdateClientController';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();

const updateClientUsecase = new UpdateClientUseCase(clientRepository, redisCacheProvider);

const updateClientController = new UpdateClientController(updateClientUsecase);

export { updateClientController }