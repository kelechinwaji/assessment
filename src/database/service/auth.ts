import { userType } from "../../types/user";
import User from "../model/user";

export class AuthService {
  /**
   * Creates a new user
   * @param user
   */
  async signup(user: userType) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return {
        error: true,
        message: `User with email ${user.email} already exists`,
      };
    }

    // Create a new user
    try {
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return {
        error: false,
        message: "User created successfully",
        user: newUser, // Optionally return the created user
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to create user",
        // Optionally include the error details for debugging
        errorDetails: error,
      };
    }
  }
}
