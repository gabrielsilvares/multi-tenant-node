import { Request, Response } from "express";
import { ShowClientUseCase } from "./ShowClientUseCase";

export class ShowClientController {
  constructor(
    private listClientUseCase: ShowClientUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    
    const user_id = request.user.id;

    try {
      const client = await this.listClientUseCase.execute({ id, user_id });

      return response.status(200).send({ client })
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}