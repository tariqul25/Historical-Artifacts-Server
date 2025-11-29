import { Schema, model } from 'mongoose';
import { IArtifact } from './artifacts.interface';

const artifactSchema = new Schema<IArtifact>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String },
  liked: { type: Number, default: 0 },
}, { timestamps: true });

export const Artifact = model<IArtifact>('Artifact', artifactSchema, 'artifacts');
