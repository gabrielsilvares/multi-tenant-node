import { Request, Response } from "express";
import { ListClientsPagUseCase } from "./ListClientsPagUseCase";

export class ListClientsPagController {
  constructor(
    private listClientsPagUseCase: ListClientsPagUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { page } = request.query;
    const { id } = request.user;

    try {
      const clients = await this.listClientsPagUseCase.execute({
        user_id: id,
        page: page !== undefined ? parseInt(page.toString(), 10) : 0
      })

      return response.status(200).send({ clients })
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}