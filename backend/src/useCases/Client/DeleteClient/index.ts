import { RedisCacheProvider } from "@providers/implementations/RedisCacheProvider";
import { ClientRepository } from "@repositories/implementations/ClientRepository";
import { DeleteClientController } from "./DeleteClientController";
import { DeleteClientUseCase } from "./DeleteClientUseCase";

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();

const deleteClientUseCase = new DeleteClientUseCase(clientRepository, redisCacheProvider);
const deleteClientController = new DeleteClientController(deleteClientUseCase);

export { deleteClientController }
