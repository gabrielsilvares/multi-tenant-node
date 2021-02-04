import AppError from "@errors/AppError";
import ICacheProvider from "@providers/ICacheProvider";
import { IClientRepository } from "@repositories/IClientRepository";
import { IDeleteClientRequestDTO } from "./IDeleteClientDTO";

export class DeleteClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cacheProvider: ICacheProvider,
  ) {}

  async execute({ id, user_id }: IDeleteClientRequestDTO): Promise<void> {
    const subId = await this.cacheProvider.recover(`subscriber-id:${user_id}`);


    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    if (client.subscriber.id !== String(subId)) {
      console.log('Nao autorizado')
      throw new AppError('Client not authorized', 401);
    }
    
    await this.clientRepository.delete(id);
  }
}