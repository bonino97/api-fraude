import { Types, Schema, model } from 'mongoose';
import { IImage } from '../interfaces/IImage';
import { IMAGE_STATUS_ENUM } from '../enums/imageStatus.enum';

const ImageSchema: Schema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    imageUrl: String,
    imagePath: String,
    processedURLs: [String],
    status: {
      type: String,
      enum: Object.values(IMAGE_STATUS_ENUM),
      default: IMAGE_STATUS_ENUM.COMPLETED,
    },
  },
  { timestamps: true }
);

export const Image = model<IImage>('Image', ImageSchema);
