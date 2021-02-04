import { Subscriber } from "@entities/Subscriber";
import { ISubscriberRepository } from "@repositories/ISubscriberRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateSubscriberRequestDTO } from "./ICreateSubscriberDTO";

export class CreateSubscriberUseCase {
  constructor(
    private subscriberRepository: ISubscriberRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id }: ICreateSubscriberRequestDTO): Promise<Subscriber> {
    const { email } = await this.userRepository.findById(user_id);

    const subscriber = await this.subscriberRepository.create({ user_id, email });
    
    return subscriber;
  }
}