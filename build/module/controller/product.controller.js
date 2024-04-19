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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../service/product.service");
const error_hand_1 = require("../../core/error-hand");
class ProductController {
    /**
     * Handles the creation of a new product.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                // @ts-ignore
                const userId = req.user._id;
                const result = yield product_service_1.ProductService.createProduct(productData, userId);
                if (result.error) {
                    return error_hand_1.info.errResponse(res, 400, result.message);
                }
                return error_hand_1.info.okResponse(res, 201, result.message, result.data);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Internal Server Error",
                    errorDetails: error,
                });
            }
        });
    }
    /**
     * Handles the retrieval of a product by its ID.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const result = yield product_service_1.ProductService.getProductById(productId);
                if (result.error) {
                    return error_hand_1.info.errResponse(res, 400, result.message);
                }
                return error_hand_1.info.okResponse(res, 200, result.message, result.data);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Internal Server Error",
                    errorDetails: error,
                });
            }
        });
    }
    /**
     * Handles the updating of a product by its ID.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static updateProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const updateData = req.body;
                const result = yield product_service_1.ProductService.updateProductById(productId, updateData);
                if (result.error) {
                    return error_hand_1.info.errResponse(res, 400, result.message);
                }
                return error_hand_1.info.okResponse(res, 200, result.message, result.data);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Internal Server Error",
                    errorDetails: error,
                });
            }
        });
    }
    /**
     * Handles the deletion of a product by its ID.
     * @param req - Express request object.
     * @param res - Express response object.
     * @returns HTTP response indicating success or failure.
     */
    static deleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const result = yield product_service_1.ProductService.deleteProductById(productId);
                if (result.error) {
                    return error_hand_1.info.errResponse(res, 400, result.message);
                }
                return error_hand_1.info.okResponse(res, 200, result.message);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Internal Server Error",
                    errorDetails: error,
                });
            }
        });
    }
}
exports.ProductController = ProductController;
