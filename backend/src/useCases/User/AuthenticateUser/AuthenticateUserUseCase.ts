import { sign, decode } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@errors/AppError';

import { IUserRepository } from '@repositories/IUserRepository';
import { IAuthenticateUserRequestDTO, IAuthenticateUserResponseDTO } from './IAuthenticateUserDTO';

import { IHashProvider } from '@providers/IHashProvider';
import ICacheProvider from '@providers/ICacheProvider';

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ email, password }: IAuthenticateUserRequestDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail/senha incorretos', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password, 
      user.password
    );

    if (!passwordMatched) {
      throw new AppError('E-mail/senha incorretos', 401);
    }

    if (!user.active) {
      throw new AppError('Usuário inativo', 401); 
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    const { subscriber } = await this.userRepository.findBySubscriberUserById(user.id);

    // await this.cacheProvider.save({ key: `token`, value: token });
    await this.cacheProvider.save({ key: `subscriber-id:${user.id}`, value: subscriber.id });

    return {
      user,
      token
    };
  }
}