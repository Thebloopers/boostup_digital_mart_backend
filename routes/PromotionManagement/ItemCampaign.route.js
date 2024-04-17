// routes/itemCampaign.routes.js

import express from "express";
import * as itemCampaignController from "../../controllers/PromotionManagement/ItemCampaign.controller.js";
import { uploadS3 } from "../../middlewares/multer.js";

const router = express.Router();

// Create item campaign route
router.post("/",uploadS3.fields([{ name: "itemImage", maxCount: 1 }]),
   itemCampaignController.createItemCampaign);

// Get all item campaigns route
router.get("/", itemCampaignController.getAllItemCampaigns);

// Get item campaign by ID route
router.get("/:id", itemCampaignController.getItemCampaignById);

// Update item campaign by ID route
router.post("/:id",uploadS3.fields([{ name: "itemImage", maxCount: 1 }]),
   itemCampaignController.updateItemCampaignById);

// Delete item campaign by ID route
router.delete("/:id", itemCampaignController.deleteItemCampaignById);

export default router;
