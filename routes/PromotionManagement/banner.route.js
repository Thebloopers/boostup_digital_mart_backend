// routes/banner.routes.js

import express from "express";
import * as bannerController from "../../controllers/PromotionManagement/Banner.controller.js";
import { uploadS3 } from "../../middlewares/multer.js";
const router = express.Router();

// Create banner route
router.post(
  "/",
  uploadS3.fields([
    { name: "bannerImage", maxCount: 1 },
    
  ]),
  bannerController.createBanner
);

// Get all banners route
router.get("/", bannerController.getAllBanners);

// Get banner by ID route
router.get("/:id", bannerController.getBannerById);

// Update banner by ID route
router.post(
  "/:id",
  uploadS3.fields([{ name: "bannerImage", maxCount: 1 }]),
  bannerController.updateBannerById
);

// Delete banner by ID route
router.delete("/:id", bannerController.deleteBannerById);

export default router;
