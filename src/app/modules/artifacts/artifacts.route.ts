import { Router } from 'express';
import { verifyJWT } from '../../middleware/auth';
import { createArtifactController, deleteArtifactController, getAllArtifactsController, getArtifactController, getArtifactsByEmailController, getMostLikedController, updateArtifactController } from './artifacts.controller';

const router = Router();

router.post('/shareartifacts', verifyJWT, createArtifactController);
router.get('/shareartifacts', getAllArtifactsController);
router.get('/shareartifacts/:id', getArtifactController);
router.get('/allartifacts', getAllArtifactsController);
router.get('/allartifacts/:id', getArtifactController);
router.get('/shareartifacts/email/:email', verifyJWT, getArtifactsByEmailController);
router.put('/updateartifacts/:id', verifyJWT, updateArtifactController);
router.delete('/shareartifacts/:id', verifyJWT, deleteArtifactController);
router.get('/mostliked', getMostLikedController);

export const artifactRoutes= router;
