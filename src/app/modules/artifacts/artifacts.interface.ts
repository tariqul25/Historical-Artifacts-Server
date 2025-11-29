import { Types } from 'mongoose';

export interface IArtifact {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  imageUrl: string;
  userEmail: string;
  userName?: string;
  liked?: number;
}
