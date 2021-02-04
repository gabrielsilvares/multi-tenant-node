import { Client } from "@entities/Client";
import { Subscriber } from "@entities/Subscriber";
import ICacheProvider from "@providers/ICacheProvider";
import { IClientRepository } from "@repositories/IClientRepository";
import { IShowClientRequestDTO } from "./IShowClientDTO";

export class ShowClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ id, user_id }: IShowClientRequestDTO): Promise<Client> {
    const subId = await this.cacheProvider.recover<Subscriber>(`subscriber-id:${user_id}`);

    const cacheKey = `client-subscriber:${subId}`;

    let client = await this.cacheProvider.recover<Client>(
      cacheKey,
    );

    if (!client) {
      client = await this.clientRepository.findById(id);

      if (client.subscriber.id === String(subId)) {
        this.cacheProvider.save({
          key: cacheKey,
          value: client,
        })
      }
    }

    if (client.subscriber.id !== String(subId)) {
      console.log('voce nao tem autorizacao para ver esse cliente');
      return 
    }

    return client;
  }
}