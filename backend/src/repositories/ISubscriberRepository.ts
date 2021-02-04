import { Subscriber } from "@entities/Subscriber";
import { ICreateSubscriberRequestDTO } from "@useCases/Subscriber/CreateSubscriber/ICreateSubscriberDTO";

export interface ISubscriberRepository {
  save(subscriber: Subscriber): Promise<Subscriber>
  create({ email }: ICreateSubscriberRequestDTO): Promise<Subscriber>;
  findBySubscriberUserByEmail(email: string): Promise<Subscriber | undefined>;
  findBySubscriberUserByUserId(user_id: string): Promise<Subscriber | undefined>;
}