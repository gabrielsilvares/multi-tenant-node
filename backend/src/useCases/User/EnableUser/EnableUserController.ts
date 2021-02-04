import { Request, Response } from "express";
import { EnableUserUseCase } from "./EnableUserUseCase";

export class EnableUserController {
  constructor (
    private enableUserUseCase: EnableUserUseCase
  ) {}
  
  async handle(request: Request, response: Response) {
    const { id } = request.params

    try {
      const user = await this.enableUserUseCase.execute({ id })

      delete user.password

      return response.status(201).send(user);
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }  
  }
}