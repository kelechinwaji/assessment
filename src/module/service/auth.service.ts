import { userType } from "../../types/user";
import { hashPassword, comparePassword } from "../../utils/password";
import User from "../../database/model/user";
import { generateJWT } from "../../utils/genereteJWT";

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
        error: false,
        message: `User with email ${user.email} already exists`,
      };
    }

    const hashedpassword = await hashPassword(user.password);
    // Create a new user
    try {
      const newUser = await User.create({
        name: user.name,
        email: user.email.toLowerCase(),
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

  /**
   * Signs in a user with the provided credentials
   * @param email The user's email
   * @param password The user's password
   * @returns The signed-in user and their authentication token
   */
  static async signIn(email: string, password: string) {
    // Check if user  exists email.toLowerCase()
    const userEmail = email.toLowerCase();

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return {
        error: false,
        message: `User with email ${email} does not exist`,
      };
    }

    // Check if the provided password matches the user's password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return {
        error: false,
        message: `Email or Password is incorrect`,
      };
    }
    // Convert user to userType and convert _id to string
    const userWithType: userType = {
      ...user.toObject(),
      _id: user._id.toString(),
    };

    // Generate authentication token
    const token = generateJWT(userWithType);

    // Omit the password from being returned
    const userWithoutPassword = { ...userWithType };

    // @ts-ignore
    delete userWithoutPassword.password;

    const data = { token, user: userWithoutPassword };

    return {
      error: false,
      message: "User Login successfully",
      user: data,
    };
  }
}
