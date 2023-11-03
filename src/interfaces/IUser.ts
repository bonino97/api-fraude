import { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  // Optionals
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  birthDate?: Date;

  isVerified?: boolean;
  verifyCode?: string | null;
  verifyCodeExpires?: Date | null;
  termsAndConditions?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  role: { type: Types.ObjectId; ref: 'Role' };
  images: [{ type: Types.ObjectId; ref: 'Image' }];
}
