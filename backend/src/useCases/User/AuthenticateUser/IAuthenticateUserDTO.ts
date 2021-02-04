import { User } from "@entities/User";

export interface IAuthenticateUserRequestDTO {
  email: string;
  password: string;
}

export interface IAuthenticateUserResponseDTO {
  user: User
  token: string;
}