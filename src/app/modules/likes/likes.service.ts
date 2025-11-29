import { Artifact } from '../artifacts/artifacts.model';
import { Types } from 'mongoose';
import { LikedArtifact } from './likes.model';

export const toggleLike = async (artifactId: string, userEmail: string) => {
  const liked = await LikedArtifact.findOne({ artifactId: new Types.ObjectId(artifactId), userEmail });
  if (liked) {
    await LikedArtifact.deleteOne({ _id: liked._id });
    await Artifact.updateOne({ _id: artifactId }, { $inc: { liked: -1 } });
    return { liked: false };
  } else {
    await LikedArtifact.create({ artifactId: new Types.ObjectId(artifactId), userEmail });
    await Artifact.updateOne({ _id: artifactId }, { $inc: { liked: 1 } });
    return { liked: true };
  }
};

export const getLikedArtifactsByUser = async (userEmail: string) => {
  const likedDocs = await LikedArtifact.find({ userEmail });
  const artifactIds = likedDocs.map(d => d.artifactId);
  return Artifact.find({ _id: { $in: artifactIds } });
};


export const unlikeArtifact = async (artifactId: string, userEmail: string) => {
  const liked = await LikedArtifact.findOne({ artifactId: new Types.ObjectId(artifactId), userEmail });
  if (!liked) return { message: 'Already unliked', modifiedCount: 0 };
  await LikedArtifact.deleteOne({ _id: liked._id });
  const updateResult = await Artifact.updateOne(
    { _id: artifactId, liked: { $gt: 0 } },
    { $inc: { liked: -1 } }
  );
  return { message: 'Successfully unliked', modifiedCount: updateResult.modifiedCount || 0 };
};

export const checkIfLiked = async (artifactId: string, userEmail: string): Promise<{ liked: boolean }> => {
    const artifactObjectId = new Types.ObjectId(artifactId);
    const likedDoc = await LikedArtifact.findOne({
        artifactId: artifactObjectId,
        userEmail: userEmail,
    });
    return {
        liked: !!likedDoc
    };
};