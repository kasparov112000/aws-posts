import { AuthData } from '../auth/auth-data.model';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: AuthData;
}
