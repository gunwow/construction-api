import { Request } from 'express';
import { User } from '../../../user/model/user.model';

export interface IRequest extends Request {
  user?: User;
  authError?: string;
}
