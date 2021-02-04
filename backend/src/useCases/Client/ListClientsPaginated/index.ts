import { ClientRepository } from '@repositories/implementations/ClientRepository';
import { ListClientsPagUseCase } from './ListClientsPagUseCase';
import { ListClientsPagController } from './ListClientsPagController';
import { RedisCacheProvider } from '@providers/implementations/RedisCacheProvider';

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();

const listClientsPagUsecase = new ListClientsPagUseCase(clientRepository, redisCacheProvider);

const listClientsPagController = new ListClientsPagController(listClientsPagUsecase);

export { listClientsPagController }