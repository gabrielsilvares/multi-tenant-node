import { Client } from "@entities/Client";
import { ClientRepository } from "@repositories/implementations/ClientRepository";
import { ISuggestClientRquestDTO } from "./ISuggestClientDTO";
import ICacheProvider from "@providers/ICacheProvider";
import ISearchProvider from "@providers/ISearchProiveder";

export class SuggestClientUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private cacheProvider: ICacheProvider,
    private searchProvider: ISearchProvider,
  ) {}

  async execute({ user_id, q }: ISuggestClientRquestDTO): Promise<String[] | undefined> {
    const subId = await this.cacheProvider.recover(`subscriber-id:${user_id}`);

    const suggest = await this.searchProvider.suggest('clients', 'default', q, { 
      lang: 'por' 
    });

    return suggest; 
  }
}