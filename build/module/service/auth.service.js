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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const password_1 = require("../../utils/password");
const user_1 = __importDefault(require("../../database/model/user"));
const genereteJWT_1 = require("../../utils/genereteJWT");
class AuthService {
    /**
     * Creates a new user
     * @param user
     */
    static signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user already exists
            const existingUser = yield user_1.default.findOne({ email: user.email });
            if (existingUser) {
                return {
                    error: false,
                    message: `User with email ${user.email} already exists`,
                };
            }
            const hashedpassword = yield (0, password_1.hashPassword)(user.password);
            // Create a new user
            try {
                const newUser = yield user_1.default.create({
                    name: user.name,
                    email: user.email.toLowerCase(),
                    password: hashedpassword,
                });
                // Omit the password field from the user data
                const userWithoutPassword = Object.assign({}, newUser.toObject());
                // @ts-ignore
                delete userWithoutPassword.password;
                return {
                    error: false,
                    message: "User created successfully",
                    user: userWithoutPassword,
                };
            }
            catch (error) {
                return {
                    error: true,
                    message: "Failed to create user",
                    errorDetails: error,
                };
            }
        });
    }
    /**
     * Signs in a user with the provided credentials
     * @param email The user's email
     * @param password The user's password
     * @returns The signed-in user and their authentication token
     */
    static signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user  exists email.toLowerCase()
            const userEmail = email.toLowerCase();
            const user = yield user_1.default.findOne({ email: userEmail });
            if (!user) {
                return {
                    error: false,
                    message: `User with email ${email} does not exist`,
                };
            }
            // Check if the provided password matches the user's password
            const passwordMatch = yield (0, password_1.comparePassword)(password, user.password);
            if (!passwordMatch) {
                return {
                    error: false,
                    message: `Email or Password is incorrect`,
                };
            }
            // Convert user to userType and convert _id to string
            const userWithType = Object.assign(Object.assign({}, user.toObject()), { _id: user._id.toString() });
            // Generate authentication token
            const token = (0, genereteJWT_1.generateJWT)(userWithType);
            // Omit the password from being returned
            const userWithoutPassword = Object.assign({}, userWithType);
            // @ts-ignore
            delete userWithoutPassword.password;
            const data = { token, user: userWithoutPassword };
            return {
                error: false,
                message: "User Login successfully",
                user: data,
            };
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findById({ _id: userId });
            if (!user) {
                return {
                    error: false,
                    message: "User not found",
                };
            }
            return user;
        });
    }
}
exports.AuthService = AuthService;
