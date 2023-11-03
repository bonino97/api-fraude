import { Types, Document, Schema } from 'mongoose';

// Image Schema and Interface
export interface IImage extends Document {
  user: Types.ObjectId;

  imageUrl: string;
  imagePath: string;
  status?: string;
  processedURLs?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
