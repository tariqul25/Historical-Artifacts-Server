import { z } from 'zod';

export const likeValidationSchema = z.object({
  artifactId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid artifact ID' }),
  userEmail: z.string().email({ message: 'Valid email is required' }),
});

export type LikeZodType = z.infer<typeof likeValidationSchema>;