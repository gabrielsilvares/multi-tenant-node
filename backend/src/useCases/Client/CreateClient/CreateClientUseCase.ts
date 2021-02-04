import { IClientRepository } from '@repositories/IClientRepository';
import { ICreateClientRequestDTO } from './ICreateClientDTO';
import { Client } from '@entities/Client';
import ICacheProvider from '@providers/ICacheProvider';
import ISearchProvider from '@providers/ISearchProiveder';

export class CreateClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider,
    private searchProvider: ISearchProvider,
  ) {}

  async execute({
    user_id,
    name,
    description,
    latitude,
    longitude,
    state,
    city,
    cep,
    region,
    images
  }: ICreateClientRequestDTO): Promise<Client> {

    const subId = await this.cacheProvider.recover(`subscriber-id:${user_id}`);

    console.log(subId)

    const client = await this.clientRepository.create({
      sub_id: String(subId),
      name,
      description,
      latitude,
      longitude,
      state,
      city,
      cep,
      region,
      images
    });

    await this.searchProvider.push('clients', 'default', `${client.id}`, `${name} ${description}`, {
      lang: 'por'
    });

    return client; 
  }
}