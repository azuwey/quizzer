import { Request } from 'express';

export interface IJwtAuthenticatedRequest extends Request {
  user: {
    _id: string;
  };
}
