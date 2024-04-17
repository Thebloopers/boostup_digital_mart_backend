// routes/notification.routes.js

import express from "express";
import * as notificationController from "../../controllers/PromotionManagement/Notification.controller.js";
import { uploadS3 } from "../../middlewares/multer.js";
const router = express.Router();
// Create notification route
router.post(
  "/",
  uploadS3.fields([{ name: "image", maxCount: 1 }]),
  notificationController.createNotification
);
// Get all notifications route
router.get("/", notificationController.getAllNotifications);
// Get notification by ID route
router.get("/:id", notificationController.getNotificationById);
// Update notification by ID route
router.put("/:id", notificationController.updateNotificationById);
// Delete notification by ID route
router.delete("/:id", notificationController.deleteNotificationById);
export default router;
