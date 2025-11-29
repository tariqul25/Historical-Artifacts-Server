"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const likes_route_1 = require("./app/modules/likes/likes.route");
const artifacts_route_1 = require("./app/modules/artifacts/artifacts.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', artifacts_route_1.artifactRoutes);
app.use('/api', likes_route_1.likedRoutes);
app.get('/', (req, res) => {
    res.send('historical-artifacts is running...');
});
exports.default = app;
