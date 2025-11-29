import { Router } from 'express';
import { verifyJWT } from '../../middleware/auth';
import { checkLikedStatusController, getLikedByUserController, toggleLikeController, unlikeArtifactController } from './likes.controller';

const router = Router();

router.patch('/like/:id', verifyJWT, toggleLikeController);
router.get('/likedartifacts/user/:email', verifyJWT, getLikedByUserController);
router.patch('/unlike/:id', verifyJWT, unlikeArtifactController);
router.get('/likedartifacts/check/:artifactId/:userEmail', verifyJWT, checkLikedStatusController);

export const likedRoutes = router;