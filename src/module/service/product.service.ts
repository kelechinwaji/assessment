import { productType } from "../../types/product";
import Product from "../../database/model/product";

export class ProductService {

   /**
   * Handles the creation of a new product.
   */
  static async createProduct(data: productType, userId: string) {
    try {
      const product = await new Product({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        quantity: data.quantity,
        user: userId,
      }).save();
      return {
        error: false,
        message: "product created successfully",
        data: product,
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to create product",
        errorDetails: error,
      };
    }
  }

   /**
   * Handles the retrieval of a product by its ID.
   */
  static async getProductById(productId: string) {
    try {
      // Query the database for the product with the provided productId
      const product = await Product.findById({ _id: productId });
      
      if (!product) {
        return {
          status: 404,
          message: "Product not found",
        };
      }

      return {
        status: 200,
        message: "Product retrieved successfully",
        data: product,
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to retrieve product",
        errorDetails: error,
      };
    }
  }

   /**
   * Handles the updating of a product by its ID.
   */
  static async updateProductById(productId: string, updateData: productType) {
    try {
      // Query the database for the product with the provided productId
      const product = await Product.findById({ _id: productId });

      if (!product) {
        return {
          error: true,
          message: "Product not found",
        };
      }

      // Update the product properties with the provided updateData
      Object.assign(product, updateData);

      // Save the updated product to the database
      await product.save();

      return {
        error: false,
        message: "Product updated successfully",
        data: product,
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to update product",
        errorDetails: error,
      };
    }
  }

    /**
   * Handles the deletion of a product by its ID.
   */
  static async deleteProductById(productId: string) {
    try {
      // Query the database for the product with the provided productId
      const product = await Product.findById({ _id: productId });

      if (!product) {
        return {
          error: true,
          message: "Product not found",
        };
      }

      // Delete the product from the database
      await Product.deleteOne({ _id: productId });

      return {
        error: false,
        message: "Product deleted successfully",
      };
    } catch (error) {
      return {
        error: true,
        message: "Failed to delete product",
        errorDetails: error,
      };
    }
  }
}
