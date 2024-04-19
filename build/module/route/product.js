"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { checkRequestErrs } from "../../utils/index";
const authValidation_1 = require("../../middleware/authValidation");
const product_controller_1 = require("../controller/product.controller");
const router = (0, express_1.Router)();
router.post("/", authValidation_1.validation, product_controller_1.ProductController.createProduct);
router.get("/:id", authValidation_1.validation, product_controller_1.ProductController.getProductById);
router.put("/:id", authValidation_1.validation, product_controller_1.ProductController.updateProductById);
router.delete("/:id", authValidation_1.validation, product_controller_1.ProductController.deleteProductById);
exports.default = router;