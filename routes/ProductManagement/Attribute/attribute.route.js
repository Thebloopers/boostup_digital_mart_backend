// routes/attribute.routes.js

import express from "express";
import * as attributeController from "../../../controllers/ProductManagement/Attribute/attribute.controller.js";

const router = express.Router();

// Create attribute route
router.post("/", attributeController.createAttribute);

// Get all attributes route
router.get("/", attributeController.getAllAttributes);

// Get attribute by ID route
router.get("/:id", attributeController.getAttributeById);

// Update attribute by ID route
router.put("/:id", attributeController.updateAttributeById);

// Delete attribute by ID route
router.delete("/:id", attributeController.deleteAttributeById);

export default router;
