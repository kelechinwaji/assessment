"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const product_1 = __importDefault(require("./product"));
const app = (0, express_1.default)();
app.use("/api/v1/user", auth_1.default);
app.use("/api/v1/product", product_1.default);
exports.default = app;
