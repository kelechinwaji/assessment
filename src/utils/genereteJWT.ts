import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { userType } from "../types/user";
dotenv.config();


 /**
   * Generates an authentication token for the given user
   * @param user The user for whom the token is generated
   * @returns The authentication token
   */
export function generateJWT(user: userType): string {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: user["_id"], email: user.email }, secret, {
    expiresIn: "100h",
  });

  return token;
}
