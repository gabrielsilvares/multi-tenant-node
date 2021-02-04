import { Client } from '@entities/Client';
import { ICreateClientRequestDTO } from '@useCases/Client/CreateClient/ICreateClientDTO';

export interface IClientRepository {
  save(client: Client): Promise<Client>;
  create({
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
  }: ICreateClientRequestDTO): Promise<Client>;
  delete(id: string): Promise<void>;
  findAll(id: string): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByIds(ids: String[], id: string): Promise<Client[] | undefined>;
  findAllPaginated(id:string, page: number): Promise<[Client[], number]>;
  findByName(name: string): Promise<Client[]>;
  findByEmail(email: string): Promise<Client | undefined>;
  findClientSubscriberBySubId(id: string): Promise<Client | undefined>;
}