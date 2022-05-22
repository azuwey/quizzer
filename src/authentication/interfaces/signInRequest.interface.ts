import { Request } from 'express';
import { User } from '../../users/schemas/user.schema';

export interface ISignInRequest extends Request {
  user: User;
}
