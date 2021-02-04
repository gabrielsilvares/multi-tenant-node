import { IUserRepository } from '@repositories/IUserRepository';
import { IHashProvider } from '@providers/IHashProvider';
import { ICreateUserRequestDTO } from './ICreateUserDTO';
import { User } from '@entities/User';
import { ISubscriberRepository } from '@repositories/ISubscriberRepository';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private subscriber: ISubscriberRepository
  ) {}

  async execute({ name, email, password }: ICreateUserRequestDTO): Promise<User> {
    const verifyUser = await this.userRepository.findByEmail(email);
    
    if (verifyUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}