import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from 'express';

export class AuthenticateUserController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const { user, token } = await this.authenticateUserUseCase.execute({ email, password });

      delete user.password;

      return response.status(201).send({
        user,
        token
      });
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}