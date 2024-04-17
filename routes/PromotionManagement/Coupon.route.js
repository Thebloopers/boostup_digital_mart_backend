// routes/coupon.routes.js

import express from "express";
import * as couponController from "../../controllers/PromotionManagement/Coupon.controller.js";

const router = express.Router();

// Create coupon route
router.post("/", couponController.createCoupon);

// Get all coupons route
router.get("/", couponController.getAllCoupons);

// Get coupon by ID route
router.get("/:id", couponController.getCouponById);

// Update coupon by ID route
router.put("/:id", couponController.updateCouponById);

// Delete coupon by ID route
router.delete("/:id", couponController.deleteCouponById);

export default router;
