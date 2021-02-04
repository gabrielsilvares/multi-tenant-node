import { CreateClientUseCase } from './CreateClientUseCase';
import { Request, Response } from 'express';

export class CreateClientController {
  constructor(
    private createClientUseCase: CreateClientUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description, 
      latitude,
      longitude,
      state,
      city,
      cep,
      region 
    } = request.body;

    const { id } = request.user

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    try {
      const client = await this.createClientUseCase.execute({
        user_id: id,
        name, 
        description, 
        latitude,
        longitude,
        state,
        city,
        cep,
        region,
        images
      })

      return response.status(201).send({client});
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error'
      })
    }
  }
}