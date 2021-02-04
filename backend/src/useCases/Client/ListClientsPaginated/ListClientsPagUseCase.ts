import { Client } from "@entities/Client";
import { IPaginated } from "src/interfaces/paginated";
import { IClientRepository } from "@repositories/IClientRepository";
import { IListClientPagRequestDTO } from "./IListClientsPagDTO";
import ICacheProvider from "@providers/ICacheProvider";
import { Subscriber } from "@entities/Subscriber";

export class ListClientsPagUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ user_id, page }: IListClientPagRequestDTO): Promise<IPaginated<Client>> {
    const subId = await this.cacheProvider.recover<Subscriber>(`subscriber-id:${user_id}`);

    const cacheKey = `clients-subscribers-paginated:${subId}`;

    let clients = await this.cacheProvider.recover<IPaginated<Client>>(
      cacheKey,
    );

    console.log(clients)

    if (!clients) {
      const [clients, total] = await this.clientRepository.findAllPaginated(
        String(subId),
        page * 10
      )
      
      const totalPages = Math.ceil(total / 10)
      
      const response: IPaginated<Client> = {
        data: clients,
        totalElements: total,
        page,
        elements: clients.length,
        elementsPerPage: 10,
        totalPages,
        firstPage: page === 0,
        lastPage: page === totalPages - 1,
      };

      this.cacheProvider.save({
        key: cacheKey,
        value: response
      })

      return response;
    }

    return clients;
  }
}