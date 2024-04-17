import express from "express";
import * as authController from "../../controllers/User/auth.js";
const router = express.Router();

router.post("/admin/signup", authController.adminInsert);
router.post("/user/signup", authController.userInsert);
router.post("/admin/login", authController.adminLogin);
router.post("/user/login", authController.userLogin);

export default router;
