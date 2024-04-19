import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AuthService } from "../module/service/auth.service";
dotenv.config();


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

export async function validation(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
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
    const secret = process.env.JWT_SECRET as string;
 
    const decoded = jwt.verify(bearerAuthToken, secret) as JwtPayload;

    // Extract the user ID from the decoded token
    const userId = decoded.id;

    // Fetch the user from the database based on the user ID
    const user = await AuthService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        error: "User does not exist!",
      });
    }

    // Attach the user object to the request for future use
    req.user = user;

    next();
  } catch (error) {
    console.error("Authorization Error:", error);
    return res.status(403).json({
      status: "failed",
      message: "Authorization Error",
    });
  }
}
