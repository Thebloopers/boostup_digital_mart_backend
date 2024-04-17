// routes/product.routes.js

import express from "express";
import { uploadS3 } from "../../../middlewares/multer.js";
import * as productController from "../../../controllers/ProductManagement/Product/Product.controller.js";

const router = express.Router();

// Create product route
router.post(
  "/",
  uploadS3.fields([
    { name: "itemImage", maxCount: 1 },
    { name: "itemThumbnail", maxCount: 1 },
  ]),
  productController.createProduct
);

// Get product route
router.get("/:id", productController.getProduct);

// Update product route
router.post(
  "/:id",
  uploadS3.fields([
    { name: "itemImage", maxCount: 1 },
    { name: "itemThumbnail", maxCount: 1 },
  ]),
  productController.updateProduct
);

// Delete product route
router.delete("/:id", productController.deleteProduct);

export default router;
