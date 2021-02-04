import { Request, Response } from "express";
import { CreateSubscriberUseCase } from "./CreateSubscriberUseCase";

export class CreateSubscriberController {
  constructor(
    private subscriberUseCase: CreateSubscriberUseCase
  ) {}
  
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.body.id;
    const { id } = request.params;

    console.log(userId);
    console.log(id)

    try {
      await this.subscriberUseCase.execute({ user_id: id });
  
      return response.status(201).send();
    } catch (error) {
      console.log(error)
      return response.status(400).send({message: `unespected Error`});
    }
  }
}