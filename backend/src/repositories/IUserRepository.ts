import { User } from '@entities/User';
import { ICreateUserRequestDTO } from '@useCases/User/CreateUser/ICreateUserDTO';

export interface IUserRepository {
  save(user: User): Promise<User>;
  create({ name, email, password }: ICreateUserRequestDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findBySubscriberUserById(id: string): Promise<User | undefined>
}
