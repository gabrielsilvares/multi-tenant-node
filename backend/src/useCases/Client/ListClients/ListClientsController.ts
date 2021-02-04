import { Request, Response } from "express";
import { ListClientsUseCase } from "./ListClientsUseCase";

export class ListClientsController {
  constructor(
    private listClientUseCase: ListClientsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    
    try {
      const clients = await this.listClientUseCase.execute({ user_id: id });

      return response.status(200).send({ clients })
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}