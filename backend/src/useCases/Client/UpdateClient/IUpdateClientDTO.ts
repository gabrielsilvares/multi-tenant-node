export interface IUpdateClientRequestDTO {
  id: string;
  user_id?: string;
  sub_id?: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  cep: string;
  region: string;
}