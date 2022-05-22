import { Request } from 'express';
import { User } from '../../users/schemas/user.schema';

export interface IJwtAuthenticatedRequest extends Request {
  user: Pick<User, '_id'>;
}
