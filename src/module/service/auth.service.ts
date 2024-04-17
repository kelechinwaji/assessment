import { userType } from "../../types/user";
import { hashPassword, comparePassword } from "../../utils/password";
import User from "../../database/model/user";

export class AuthService {
  /**
   * Creates a new user
   * @param user
   */
  static async signup(user: userType) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return {
        error: true,
        message: `User with email ${user.email} already exists`,
      };
    }

    const hashedpassword = await hashPassword(user.password);
    // Create a new user
    try {
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: hashedpassword,
      });

      return {
        error: false,
        message: "User created successfully",
        user: newUser,
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to create user",
        errorDetails: error,
      };
    }
  }

  
}
