import { Request, Response } from "express";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

export class UpdateClientController {
  constructor(
    private updateClientUseCase: UpdateClientUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const user_id = request.user.id;

    const { id } = request.params;

    const {
      name, 
      description, 
      latitude,
      longitude,
      state,
      city,
      cep,
      region,
    } = request.body;

    try {
      const client = await this.updateClientUseCase.execute({
        id,
        user_id,
        name, 
        description, 
        latitude,
        longitude,
        state,
        city,
        cep,
        region,
      })

      return response.status(200).send({client})
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}