import { User } from "@entities/User";
import AppError from "@errors/AppError";
import { IUserRepository } from "@repositories/IUserRepository";
import { EnableUserRequestDTO } from "./EnableUserDTO";

export class EnableUserUseCase {

  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute({ id }: EnableUserRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 401)
    }

    user.active = !user.active;

    await this.userRepository.save(user);

    return user;
  }
}