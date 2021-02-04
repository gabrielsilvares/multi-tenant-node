import { Client } from "@entities/Client";
import { Subscriber } from "@entities/Subscriber";
import AppError from "@errors/AppError";
import ICacheProvider from "@providers/ICacheProvider";
import { IClientRepository } from "@repositories/IClientRepository";
import { IUpdateClientRequestDTO } from "./IUpdateClientDTO";

export class UpdateClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider
  ) {}

  async execute({
    id,
    user_id,
    name, 
    description, 
    latitude,
    longitude,
    state,
    city,
    cep,
    region,
  }: IUpdateClientRequestDTO): Promise<Client> {
    
    const subId = await this.cacheProvider.recover<Subscriber>(`subscriber-id:${user_id}`);

    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found')
    }

    const clientSubscriber = client.subscriber.id;

    if (clientSubscriber !== String(subId)) {
      throw new AppError('unauthorized update');
    }

    client.name = name
    client.description = description
    client.latitude = latitude
    client.longitude = longitude
    client.state = state
    client.city = city
    client.cep = cep
    client.region = region

    await this.clientRepository.save(client);

    return client
  }
}