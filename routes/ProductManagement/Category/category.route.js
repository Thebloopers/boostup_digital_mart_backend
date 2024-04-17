// routes/category.routes.js

import express from "express";
import * as categoryController from "../../../controllers/ProductManagement/Category/Category.controller.js";
import { uploadS3 } from "../../../middlewares/multer.js";
const router = express.Router();

// Create category route
router.post(
  "/",
  uploadS3.fields([{ name: "image", maxCount: 1 }]),
  categoryController.createCategory
);

// Get category route
router.get("/:id", categoryController.getCategory);

// Update category route
router.post(
  "/:id",
  uploadS3.fields([{ name: "image", maxCount: 1 }]),
  categoryController.updateCategory
);

// Delete category route
router.delete("/:id", categoryController.deleteCategory);

export default router;
