import { Types, Document } from 'mongoose';

export interface IRole extends Document {
  id: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
