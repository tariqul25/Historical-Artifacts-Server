"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfLiked = exports.unlikeArtifact = exports.getLikedArtifactsByUser = exports.toggleLike = void 0;
const artifacts_model_1 = require("../artifacts/artifacts.model");
const mongoose_1 = require("mongoose");
const likes_model_1 = require("./likes.model");
const toggleLike = (artifactId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const liked = yield likes_model_1.LikedArtifact.findOne({ artifactId: new mongoose_1.Types.ObjectId(artifactId), userEmail });
    if (liked) {
        yield likes_model_1.LikedArtifact.deleteOne({ _id: liked._id });
        yield artifacts_model_1.Artifact.updateOne({ _id: artifactId }, { $inc: { liked: -1 } });
        return { liked: false };
    }
    else {
        yield likes_model_1.LikedArtifact.create({ artifactId: new mongoose_1.Types.ObjectId(artifactId), userEmail });
        yield artifacts_model_1.Artifact.updateOne({ _id: artifactId }, { $inc: { liked: 1 } });
        return { liked: true };
    }
});
exports.toggleLike = toggleLike;
const getLikedArtifactsByUser = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const likedDocs = yield likes_model_1.LikedArtifact.find({ userEmail });
    const artifactIds = likedDocs.map(d => d.artifactId);
    return artifacts_model_1.Artifact.find({ _id: { $in: artifactIds } });
});
exports.getLikedArtifactsByUser = getLikedArtifactsByUser;
const unlikeArtifact = (artifactId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const liked = yield likes_model_1.LikedArtifact.findOne({ artifactId: new mongoose_1.Types.ObjectId(artifactId), userEmail });
    if (!liked)
        return { message: 'Already unliked', modifiedCount: 0 };
    yield likes_model_1.LikedArtifact.deleteOne({ _id: liked._id });
    const updateResult = yield artifacts_model_1.Artifact.updateOne({ _id: artifactId, liked: { $gt: 0 } }, { $inc: { liked: -1 } });
    return { message: 'Successfully unliked', modifiedCount: updateResult.modifiedCount || 0 };
});
exports.unlikeArtifact = unlikeArtifact;
const checkIfLiked = (artifactId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const artifactObjectId = new mongoose_1.Types.ObjectId(artifactId);
    const likedDoc = yield likes_model_1.LikedArtifact.findOne({
        artifactId: artifactObjectId,
        userEmail: userEmail,
    });
    return {
        liked: !!likedDoc
    };
});
exports.checkIfLiked = checkIfLiked;
