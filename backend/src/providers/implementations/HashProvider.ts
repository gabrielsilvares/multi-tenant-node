import { hash, compare } from 'bcrypt';
import { IHashProvider } from '../IHashProvider';

export class HashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 10)
  }
  
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}