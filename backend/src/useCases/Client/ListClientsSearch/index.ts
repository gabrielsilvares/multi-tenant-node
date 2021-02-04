import { RedisCacheProvider } from "@providers/implementations/RedisCacheProvider";
import { SearchProvider } from "@providers/implementations/SearchProvider";
import { ClientRepository } from "@repositories/implementations/ClientRepository";
import { ListClientsSearchUseCase } from "./ListClientsSearchUseCase";
import { ListClientsSearchController } from "./ListCllientsSearchController";

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();
const searchProvider = new SearchProvider()

const listClientsSearchUseCase = new ListClientsSearchUseCase(clientRepository, redisCacheProvider, searchProvider);

const listClientsSearchController = new ListClientsSearchController(listClientsSearchUseCase);

export { listClientsSearchController }
