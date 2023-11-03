import { Schema, model, Document } from 'mongoose';
import { IRole } from '../interfaces/IRole';
import { ROLES_ENUM } from '../enums/roles.enum';

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Role name is required'],
      enum: {
        values: Object.values(ROLES_ENUM),
        message: 'Role is not valid',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Role = model<IRole>('Role', RoleSchema);
