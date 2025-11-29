import { Artifact } from './artifacts.model';
import { IArtifact } from './artifacts.interface';

export const createArtifact = async (payload: IArtifact) => {
    const createdArtifact = await Artifact.create(payload);
    return createdArtifact;
};
export const getAllArtifacts = async () => {
    const allartifacts= await Artifact.find();
    return allartifacts;
};
export const getArtifactById = async (id: string) => {
     const artifactsbyid= await Artifact.findById(id);
     return artifactsbyid;
};
export const getArtifactsByEmail = async (email: string) => {
    const artifactsbyemail= await Artifact.find({ userEmail: email });
    return artifactsbyemail;
};
export const updateArtifact = async (id: string, payload: Partial<IArtifact>) => {
    const updatedArtifact = await Artifact.findByIdAndUpdate(id, payload, { new: true });
    return updatedArtifact;
};
export const deleteArtifact = async (id: string) => {
    const deletedArtifact = await Artifact.findByIdAndDelete(id);
    return deletedArtifact;
};
export const getMostLikedArtifacts = async (limit: number = 6) => {
    const mostLikedArtifacts = await Artifact.find().sort({ liked: -1 }).limit(limit);
    return mostLikedArtifacts;
};