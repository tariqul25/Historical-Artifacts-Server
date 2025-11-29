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
exports.getMostLikedController = exports.deleteArtifactController = exports.updateArtifactController = exports.getArtifactsByEmailController = exports.getArtifactController = exports.getAllArtifactsController = exports.createArtifactController = void 0;
const artifacts_service_1 = require("./artifacts.service");
const createArtifactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.createArtifact)(req.body);
    res.status(201).json(result);
});
exports.createArtifactController = createArtifactController;
const getAllArtifactsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.getAllArtifacts)();
    res.status(201).json(result);
});
exports.getAllArtifactsController = getAllArtifactsController;
const getArtifactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.getArtifactById)(req.params.id);
    res.status(201).json(result);
});
exports.getArtifactController = getArtifactController;
const getArtifactsByEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.getArtifactsByEmail)(req.params.email);
    res.status(201).json(result);
});
exports.getArtifactsByEmailController = getArtifactsByEmailController;
const updateArtifactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.updateArtifact)(req.params.id, req.body);
    res.status(201).json(result);
});
exports.updateArtifactController = updateArtifactController;
const deleteArtifactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.deleteArtifact)(req.params.id);
    res.status(201).json(result);
});
exports.deleteArtifactController = deleteArtifactController;
const getMostLikedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, artifacts_service_1.getMostLikedArtifacts)();
    res.send(result);
});
exports.getMostLikedController = getMostLikedController;
