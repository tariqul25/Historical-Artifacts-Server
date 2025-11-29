import {  Request, Response } from 'express';
import { checkIfLiked, getLikedArtifactsByUser, toggleLike, unlikeArtifact } from './likes.service';
import { LikedArtifact } from './likes.model';
import { Types } from 'mongoose';

export const toggleLikeController = async (req: Request, res: Response) => {
  const { userEmail } = req.body;
  const result = await toggleLike(req.params.id, userEmail);
  res.status(201).json(result);
};

export const getLikedByUserController = async (req: Request, res: Response) => {
  const result = await getLikedArtifactsByUser(req.params.email);
  res.status(201).json(result);
};


export const unlikeArtifactController = async (req: Request, res: Response) => {
  const { userEmail } = req.body;
  const result = await unlikeArtifact(req.params.id, userEmail);
  res.status(201).json(result);
};

export const checkLikedStatusController = async (req: Request, res: Response) => {
    const { artifactId, userEmail } = req.params;

    if (!artifactId || !userEmail) {
        return res.status(400).json({ error: 'Artifact ID and User Email are required in parameters.' });
    }

    try {
        const result = await checkIfLiked(artifactId, userEmail);
        res.status(201).json(result);
        
    } catch (error) {
        console.error("Error in checkLikedStatusController:", error);
        res.status(500).json({ error: 'Server error while checking liked status' });
    }
};