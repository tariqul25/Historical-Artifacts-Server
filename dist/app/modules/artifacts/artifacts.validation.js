"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeBodySchema = exports.updateArtifactSchema = exports.createArtifactSchema = void 0;
const zod_1 = require("zod");
exports.createArtifactSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url(),
    userEmail: zod_1.z.string().email(),
    userName: zod_1.z.string().optional()
});
exports.updateArtifactSchema = exports.createArtifactSchema.partial();
exports.likeBodySchema = zod_1.z.object({
    userEmail: zod_1.z.string().email()
});
