import { Response } from "express";

export class info {
  static errResponse(
    res: Response,
    status: number,
    message: string,
    error?: any
  ) {
    return res.status(status).json({
      status: false,
      message,
      error,
    });
  }

  static genericError(message: string, error?: any) {
    return {
      status: false,
      message,
      error,
    };
  }

  static okResponse(
    res: Response,
    status: number,
    message: string,
    data?: any
  ) {
    return res.status(status).json({
      status: true,
      message,
      data,
    });
  }
}
