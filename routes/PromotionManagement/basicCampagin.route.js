// routes/campaign.routes.js

import express from "express";
import * as campaignController from "../../controllers/PromotionManagement/BasicCampaign.controller.js";
import { uploadS3 } from "../../middlewares/multer.js";

const router = express.Router();

// Create campaign route
router.post(
  "/",
  uploadS3.fields([{ name: "itemImage", maxCount: 1 }]),
  campaignController.createCampaign
);

// Get all campaigns route
router.get("/", campaignController.getAllCampaigns);

// Get campaign by ID route
router.get("/:id", campaignController.getCampaignById);

// Update campaign by ID route
router.post(
  "/:id",
  uploadS3.fields([{ name: "itemImage", maxCount: 1 }]),
  campaignController.updateCampaignById
);

// Delete campaign by ID route
router.delete("/:id", campaignController.deleteCampaignById);

export default router;
