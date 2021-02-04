import { RedisCacheProvider } from "@providers/implementations/RedisCacheProvider";
import { SearchProvider } from "@providers/implementations/SearchProvider";
import { ClientRepository } from "@repositories/implementations/ClientRepository";
import { SuggestClientUseCase } from "./SuggestClientUseCase";
import { SuggestClientController } from "./SuggestClientController";

const clientRepository = new ClientRepository();
const redisCacheProvider = new RedisCacheProvider();
const searchProvider = new SearchProvider();

const suggestClientUseCase = new SuggestClientUseCase(clientRepository, redisCacheProvider, searchProvider);

const suggestClientController = new SuggestClientController(suggestClientUseCase);

export { suggestClientController }
