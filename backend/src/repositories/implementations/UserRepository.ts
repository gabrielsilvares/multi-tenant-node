import { getRepository, Repository, getConnectionManager } from 'typeorm';
import { IUserRepository } from '../IUserRepository';
import { ICreateUserRequestDTO } from '@useCases/User/CreateUser/ICreateUserDTO';
import { User } from '@entities/User';

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    return await getRepository(User).save(user);
  }

  async create({ name, email, password }: ICreateUserRequestDTO): Promise<User> {
    const user = await getRepository(User).create({ 
      name, 
      email, 
      password,
      subscriber: {
        email,
      }
    });

    await getRepository(User).save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await getRepository(User).findOne({ where: { email } })

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return await getRepository(User).findOne({
      where: { id },
    })
  }

  async findBySubscriberUserById(id: string): Promise<User | undefined> {
    return await getRepository(User).findOneOrFail(id, {
      relations: ["subscriber"]
    })
  }
}