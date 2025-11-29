import { Request, Response } from 'express';
import { createArtifact, deleteArtifact, getAllArtifacts, getArtifactById, getArtifactsByEmail, getMostLikedArtifacts, updateArtifact } from './artifacts.service';

export const createArtifactController = async (req: Request, res: Response) => {
  const result = await createArtifact(req.body);
  res.status(201).json(result);
};

export const getAllArtifactsController = async (req: Request, res: Response) => {
  const result = await getAllArtifacts();
  res.status(201).json(result);
};

export const getArtifactController = async (req: Request, res: Response) => {
  const result = await getArtifactById(req.params.id);
  res.status(201).json(result);
};

export const getArtifactsByEmailController = async (req: Request, res: Response) => {
  const result = await getArtifactsByEmail(req.params.email);
  res.status(201).json(result);
};

export const updateArtifactController = async (req: Request, res: Response) => {
  const result = await updateArtifact(req.params.id, req.body);
  res.status(201).json(result);
};

export const deleteArtifactController = async (req: Request, res: Response) => {
  const result = await deleteArtifact(req.params.id);
  res.status(201).json(result);
};

export const getMostLikedController = async (req: Request, res: Response) => {
  const result = await getMostLikedArtifacts();
  res.send(result);
};
