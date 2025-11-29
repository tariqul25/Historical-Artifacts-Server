"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artifact = void 0;
const mongoose_1 = require("mongoose");
const artifactSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String },
    liked: { type: Number, default: 0 },
}, { timestamps: true });
exports.Artifact = (0, mongoose_1.model)('Artifact', artifactSchema, 'artifacts');
