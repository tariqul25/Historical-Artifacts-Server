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
exports.getMostLikedArtifacts = exports.deleteArtifact = exports.updateArtifact = exports.getArtifactsByEmail = exports.getArtifactById = exports.getAllArtifacts = exports.createArtifact = void 0;
const artifacts_model_1 = require("./artifacts.model");
const createArtifact = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdArtifact = yield artifacts_model_1.Artifact.create(payload);
    return createdArtifact;
});
exports.createArtifact = createArtifact;
const getAllArtifacts = () => __awaiter(void 0, void 0, void 0, function* () {
    const allartifacts = yield artifacts_model_1.Artifact.find();
    return allartifacts;
});
exports.getAllArtifacts = getAllArtifacts;
const getArtifactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const artifactsbyid = yield artifacts_model_1.Artifact.findById(id);
    return artifactsbyid;
});
exports.getArtifactById = getArtifactById;
const getArtifactsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const artifactsbyemail = yield artifacts_model_1.Artifact.find({ userEmail: email });
    return artifactsbyemail;
});
exports.getArtifactsByEmail = getArtifactsByEmail;
const updateArtifact = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedArtifact = yield artifacts_model_1.Artifact.findByIdAndUpdate(id, payload, { new: true });
    return updatedArtifact;
});
exports.updateArtifact = updateArtifact;
const deleteArtifact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedArtifact = yield artifacts_model_1.Artifact.findByIdAndDelete(id);
    return deletedArtifact;
});
exports.deleteArtifact = deleteArtifact;
const getMostLikedArtifacts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 6) {
    const mostLikedArtifacts = yield artifacts_model_1.Artifact.find().sort({ liked: -1 }).limit(limit);
    return mostLikedArtifacts;
});
exports.getMostLikedArtifacts = getMostLikedArtifacts;
