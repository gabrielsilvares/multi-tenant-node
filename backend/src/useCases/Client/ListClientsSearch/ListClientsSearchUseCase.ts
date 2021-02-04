import { Client } from "@entities/Client";
import { ClientRepository } from "@repositories/implementations/ClientRepository";
import { IListClientsSearchRequestDTO } from "./IListClientsSearchDTO";
import ICacheProvider from "@providers/ICacheProvider";
import ISearchProvider from "@providers/ISearchProiveder";

export class ListClientsSearchUseCase {
  constructor(
    private clientRepository: ClientRepository,
    private cacheProvider: ICacheProvider,
    private searchProvider: ISearchProvider,
  ) {}

  async execute({ user_id, q }: IListClientsSearchRequestDTO): Promise<Client[] | undefined> {
    const subId = await this.cacheProvider.recover(`subscriber-id:${user_id}`);

    const ids = await this.searchProvider.search('clients', 'default', q, { 
      lang: 'por' 
    })

    const id = String(subId)
    
    const clients = this.clientRepository.findByIds(ids, id);
    
    return clients; 
  }
}