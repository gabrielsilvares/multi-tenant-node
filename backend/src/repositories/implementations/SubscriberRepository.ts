import { Subscriber } from "@entities/Subscriber";
import { ICreateSubscriberRequestDTO } from "@useCases/Subscriber/CreateSubscriber/ICreateSubscriberDTO";
import { getRepository } from "typeorm";

export class SubscriberRepository {
  async save(subscriber: Subscriber): Promise<Subscriber> {
    return await getRepository(Subscriber).save(subscriber);
  }
  
  async create({ user_id, email, plan }: ICreateSubscriberRequestDTO): Promise<Subscriber> {
    const data = {
      user: {
        id: user_id,
      }, 
      email,
      plan 
    }

    const subscriber = await getRepository(Subscriber).create(data);

    await getRepository(Subscriber).save(subscriber);

    return subscriber;
  }

  async findBySubscriberUserByEmail(email: string): Promise<Subscriber> {
    const subscriber = await getRepository(Subscriber).findOne({ where: { email } });

    await getRepository(Subscriber).save(subscriber);

    return subscriber;
  }

  async findBySubscriberUserByUserId(user_id: string): Promise<Subscriber | undefined > {
    const subscriber = await getRepository(Subscriber).findOne({ where: { user: { id: user_id } } });

    await getRepository(Subscriber).save(subscriber);

    return subscriber;
  }
}