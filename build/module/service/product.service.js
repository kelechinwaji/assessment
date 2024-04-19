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
exports.ProductService = void 0;
const product_1 = __importDefault(require("../../database/model/product"));
class ProductService {
    /**
    * Handles the creation of a new product.
    */
    static createProduct(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield new product_1.default({
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
            }
            catch (error) {
                return {
                    error: true,
                    message: "Failed to create product",
                    errorDetails: error,
                };
            }
        });
    }
    /**
    * Handles the retrieval of a product by its ID.
    */
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query the database for the product with the provided productId
                const product = yield product_1.default.findById({ _id: productId });
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
            }
            catch (error) {
                return {
                    error: true,
                    message: "Failed to retrieve product",
                    errorDetails: error,
                };
            }
        });
    }
    /**
    * Handles the updating of a product by its ID.
    */
    static updateProductById(productId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query the database for the product with the provided productId
                const product = yield product_1.default.findById({ _id: productId });
                if (!product) {
                    return {
                        error: true,
                        message: "Product not found",
                    };
                }
                // Update the product properties with the provided updateData
                Object.assign(product, updateData);
                // Save the updated product to the database
                yield product.save();
                return {
                    error: false,
                    message: "Product updated successfully",
                    data: product,
                };
            }
            catch (error) {
                return {
                    error: true,
                    message: "Failed to update product",
                    errorDetails: error,
                };
            }
        });
    }
    /**
   * Handles the deletion of a product by its ID.
   */
    static deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Query the database for the product with the provided productId
                const product = yield product_1.default.findById({ _id: productId });
                if (!product) {
                    return {
                        error: true,
                        message: "Product not found",
                    };
                }
                // Delete the product from the database
                yield product_1.default.deleteOne({ _id: productId });
                return {
                    error: false,
                    message: "Product deleted successfully",
                };
            }
            catch (error) {
                return {
                    error: true,
                    message: "Failed to delete product",
                    errorDetails: error,
                };
            }
        });
    }
}
exports.ProductService = ProductService;
