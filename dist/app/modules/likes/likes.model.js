"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikedArtifact = void 0;
const mongoose_1 = require("mongoose");
const likedArtifactSchema = new mongoose_1.Schema({
    artifactId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Artifact', required: true },
    userEmail: { type: String, required: true },
    likedAt: { type: Date, default: new Date() },
});
exports.LikedArtifact = (0, mongoose_1.model)('LikedArtifact', likedArtifactSchema, 'likedArtifacts');
