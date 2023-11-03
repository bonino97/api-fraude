import { Schema, Types, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema(
  {
    firstName: String,
    lastName: String,
    dni: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    address: String,
    city: String,
    country: String,
    birthDate: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: String,
    verifyCodeExpires: Date,
    termsAndConditions: Boolean,

    role: { type: Types.ObjectId, ref: 'Role', required: true },
    images: [{ type: Types.ObjectId, ref: 'Image' }],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', UserSchema);
