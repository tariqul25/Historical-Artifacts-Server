import { Types } from 'mongoose';

export interface ILikedArtifact {
  artifactId: Types.ObjectId;
  userEmail: string;
  likedAt?: Date;
}
