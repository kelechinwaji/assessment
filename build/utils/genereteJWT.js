"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
  * Generates an authentication token for the given user
  * @param user The user for whom the token is generated
  * @returns The authentication token
  */
function generateJWT(user) {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id: user["_id"], email: user.email }, secret, {
        expiresIn: "100h",
    });
    return token;
}
exports.generateJWT = generateJWT;
