import { Router } from "express";
// import { checkRequestErrs } from "../../utils/index";
import { validation } from "../../middleware/authValidation";
import { ProductController } from "../controller/product.controller";

const router = Router();

router.post("/", validation, ProductController.createProduct);
router.get("/:id", validation, ProductController.getProductById);
router.put("/:id", validation, ProductController.updateProductById);
router.delete("/:id", validation, ProductController.deleteProductById);

export default router;
