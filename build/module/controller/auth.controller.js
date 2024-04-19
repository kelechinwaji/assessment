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
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
const error_hand_1 = require("../../core/error-hand");
class AuthController {
    /**
     * Handles the sign-up process for an user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const result = yield auth_service_1.AuthService.signup(body);
                return error_hand_1.info.okResponse(res, 201, result.message, result.user);
            }
            catch (error) {
                return error_hand_1.info.errResponse(res, 500, "Internal Server Error", error);
            }
        });
    }
    /**
     * Handles the login process for a user.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield auth_service_1.AuthService.signIn(email, password);
                return error_hand_1.info.okResponse(res, 200, result.message, result.user);
            }
            catch (error) {
                return error_hand_1.info.errResponse(res, 500, "Internal Server Error", error);
            }
        });
    }
}
exports.AuthController = AuthController;
