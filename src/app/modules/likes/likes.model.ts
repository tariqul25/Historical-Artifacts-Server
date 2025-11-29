import { Schema, model } from 'mongoose';
import { Artifact } from '../artifacts/artifacts.model';
import { ILikedArtifact } from './likes.interface';

const likedArtifactSchema = new Schema<ILikedArtifact>({
  artifactId: { type: Schema.Types.ObjectId, ref: 'Artifact', required: true },
  userEmail: { type: String, required: true },
  likedAt: { type: Date, default: new Date() },
});

export const LikedArtifact = model<ILikedArtifact>('LikedArtifact', likedArtifactSchema, 'likedArtifacts');
