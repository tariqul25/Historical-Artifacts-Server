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
exports.checkLikedStatusController = exports.unlikeArtifactController = exports.getLikedByUserController = exports.toggleLikeController = void 0;
const likes_service_1 = require("./likes.service");
const toggleLikeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    const result = yield (0, likes_service_1.toggleLike)(req.params.id, userEmail);
    res.status(201).json(result);
});
exports.toggleLikeController = toggleLikeController;
const getLikedByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, likes_service_1.getLikedArtifactsByUser)(req.params.email);
    res.status(201).json(result);
});
exports.getLikedByUserController = getLikedByUserController;
const unlikeArtifactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    const result = yield (0, likes_service_1.unlikeArtifact)(req.params.id, userEmail);
    res.status(201).json(result);
});
exports.unlikeArtifactController = unlikeArtifactController;
const checkLikedStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artifactId, userEmail } = req.params;
    if (!artifactId || !userEmail) {
        return res.status(400).json({ error: 'Artifact ID and User Email are required in parameters.' });
    }
    try {
        const result = yield (0, likes_service_1.checkIfLiked)(artifactId, userEmail);
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error in checkLikedStatusController:", error);
        res.status(500).json({ error: 'Server error while checking liked status' });
    }
});
exports.checkLikedStatusController = checkLikedStatusController;
