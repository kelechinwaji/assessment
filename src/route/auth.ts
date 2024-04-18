import { Router } from "express";
// import { checkRequestErrs } from "../../utils/index";
// import { requiresAuth } from "../../middlewares/auth";
import { AuthController } from "../module/controller/auth.controller";

const router = Router();

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.signIn);


export default router;
