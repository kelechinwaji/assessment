import { Request, Response } from "express";
import { userType } from "../../types/user";
import { AuthService } from "../service/auth.service";
import { hashPassword, comparePassword } from "../../utils/password";
import { info } from "../../core/error-hand";

export class AuthController {
  /**
   * Handles the sign-up process for an user.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns HTTP response indicating success or failure.
   */
  static async signUp(req: Request, res: Response) {
    try {
      const body: userType = req.body;
      const result = await AuthService.signup(body);
      return info.okResponse(res, 201, result.message, result.user);
    } catch (error) {
      return info.errResponse(res, 500, "Internal Server Error", error);
    }
  }
}
