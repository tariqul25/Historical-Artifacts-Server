"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeValidationSchema = void 0;
const zod_1 = require("zod");
exports.likeValidationSchema = zod_1.z.object({
    artifactId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid artifact ID' }),
    userEmail: zod_1.z.string().email({ message: 'Valid email is required' }),
});
