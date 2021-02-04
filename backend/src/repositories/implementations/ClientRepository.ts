import { getConnectionManager, getRepository, Raw, Repository } from "typeorm";

import { Client } from "@entities/Client";
import { IClientRepository } from "@repositories/IClientRepository";
import { ICreateClientRequestDTO } from "@useCases/Client/CreateClient/ICreateClientDTO";

export class ClientRepository implements IClientRepository {
  async save(client: Client): Promise<Client> {
    const clientRepository = await getRepository(Client);

    return clientRepository.save(client);
  }

  async create({ 
    sub_id,
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
    const clientRepository = await getRepository(Client);

    const client = clientRepository.create({ 
      subscriber: {
        id: sub_id
      },
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

    await getRepository(Client).save(client);

    return client;
  }

  async delete(id: string): Promise<void> {
    await getRepository(Client).delete(id);
  }

  async findAll(): Promise<Client[]> {
    const clientRepository = await getRepository(Client);
    return clientRepository.find()
  }

  async findAllPaginated(id: string, page: number): Promise<[Client[], number]> {
    const clientRepository = await getRepository(Client)

    return clientRepository.findAndCount({
      where: { 
        subscriber: { id }
      },
      skip: page,
      take: 10,
    })
  }
  
  async findBySubId(id: string): Promise<Client | undefined> {
    return await getRepository(Client).findOneOrFail({
      where: { 
        subscriber: { id }
      }
    })
  }
  
  async findById(id: string): Promise<Client | undefined> {
    return await getRepository(Client).findOneOrFail(id, { relations: ["subscriber"] })
  }

  async findByIds(ids: String[], id: string): Promise<Client[] | undefined> {
    return await getRepository(Client).findByIds(ids, {
      where: { 
        subscriber: id
      }
    });
  }

  async findByName(name: string): Promise<Client[] | undefined> {
    return await getRepository(Client).find({ 
      where: { 
        name: Raw(alias => `${alias} ILIKE '%${name}%'`)
      }
    })
  }

  async findByEmail(email: string): Promise<Client | undefined> {
    const client = await getRepository(Client).findOne({ where: { email } });

    return client
  }

  async findClientSubscriberBySubId(id: string): Promise<Client | undefined> {
    const clientRepository = getRepository(Client)

    const client = clientRepository.findOneOrFail({ 
      where: { subscriber: { id } }
    });

    return client
  }
}