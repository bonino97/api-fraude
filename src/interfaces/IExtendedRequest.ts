import { Request } from 'express';
import { IUserPayload } from './IUserPayload';

export interface IExtendedRequest extends Request {
  user?: IUserPayload;
}
