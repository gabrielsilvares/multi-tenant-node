import { Client } from "@entities/Client";
import { Subscriber } from "@entities/Subscriber";
import ICacheProvider from "@providers/ICacheProvider";
import { IClientRepository } from "@repositories/IClientRepository";
import { IListClientRequestDTO } from "./IListClientsDTO";

export class ListClientsUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ user_id }: IListClientRequestDTO): Promise<Client[]> {
    const subId = await this.cacheProvider.recover<Subscriber>(`subscriber-id:${user_id}`);

    const cacheKey = `clients-subscribers:${subId}`;

    let clients = await this.cacheProvider.recover<Client[]>(
      cacheKey,
    );

    if (!clients) {
      clients = await this.clientRepository.findAll(String(subId));

      this.cacheProvider.save({
        key: cacheKey,
        value: clients,
      })
    }

    return clients;
  }
}