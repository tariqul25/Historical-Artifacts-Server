import { z } from 'zod';

export const createArtifactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  userEmail: z.string().email(),
  userName: z.string().optional()
});

export const updateArtifactSchema = createArtifactSchema.partial();

export const likeBodySchema = z.object({
  userEmail: z.string().email()
});
