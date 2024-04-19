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
exports.validation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_service_1 = require("../module/service/auth.service");
dotenv_1.default.config();
// export function validation(
//   req: Request | any,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!req.headers.authorization) {
//     return res.status(401).json({
//       status: "failed",
//       message: "No Authorization header provided",
//     });
//   }
//   try {
//     const [authorization, token] = req.headers.authorization.split(" ");
//     if (authorization !== "Bearer") {
//       return res.status(401).json({
//         status: "failed",
//         message: "Invalid Authorization Header",
//       });
//     }
//     const secret = process.env.JWT_SECRET as string;
// console.log(req.user,)
//     req.user = jwt.verify(token, secret);
//     return next();
//   } catch (err) {
//     console.log(err, "check")
//     return res.status(403).json({
//       status: "failed",
//       message: "Authorization Error",
//     });
//   }
// }
function validation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract the bearer token from the request headers or query parameters
            const bearerAuthToken = req.headers.authorization || req.query.token;
            if (!bearerAuthToken || bearerAuthToken === "null") {
                return res.status(401).json({
                    status: "failed",
                    error: "Please login",
                });
            }
            // Verify the authenticity of the bearer token
            const secret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(bearerAuthToken, secret);
            // Extract the user ID from the decoded token
            const userId = decoded.id;
            // Fetch the user from the database based on the user ID
            const user = yield auth_service_1.AuthService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    error: "User does not exist!",
                });
            }
            // Attach the user object to the request for future use
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Authorization Error:", error);
            return res.status(403).json({
                status: "failed",
                message: "Authorization Error",
            });
        }
    });
}
exports.validation = validation;
