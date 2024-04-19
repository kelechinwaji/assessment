import { Request, Response } from "express";
import { productType } from "../../types/product";
import { ProductService } from "../service/product.service";
import { info } from "../../core/error-hand";

export class ProductController {
  /**
   * Handles the creation of a new product.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns HTTP response indicating success or failure.
   */
  static async createProduct(req: Request, res: Response) {
    try {
      const productData = req.body;
      // @ts-ignore
      const userId = req.user._id;

      const result = await ProductService.createProduct(productData, userId);
      if (result.error) {
        return info.errResponse(res, 400, result.message);
      }
      return info.okResponse(res, 201, result.message, result.data);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        errorDetails: error,
      });
    }
  }

  /**
   * Handles the retrieval of a product by its ID.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns HTTP response indicating success or failure.
   */
  static async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const result = await ProductService.getProductById(productId);
      if (result.error) {
        return info.errResponse(res, 400, result.message);
      }
      return info.okResponse(res, 200, result.message, result.data);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        errorDetails: error,
      });
    }
  }

  /**
   * Handles the updating of a product by its ID.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns HTTP response indicating success or failure.
   */
  static async updateProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const result = await ProductService.updateProductById(
        productId,
        updateData
      );
      if (result.error) {
        return info.errResponse(res, 400, result.message);
      }
      return info.okResponse(res, 200, result.message, result.data);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        errorDetails: error,
      });
    }
  }

  /**
   * Handles the deletion of a product by its ID.
   * @param req - Express request object.
   * @param res - Express response object.
   * @returns HTTP response indicating success or failure.
   */
  static async deleteProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const result = await ProductService.deleteProductById(productId);
      if (result.error) {
        return info.errResponse(res, 400, result.message);
      }
      return info.okResponse(res, 200, result.message);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
        errorDetails: error,
      });
    }
  }
}
