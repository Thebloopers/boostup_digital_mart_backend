// routes/unit.routes.js

import express from "express";
import * as unitController from "../../../controllers/ProductManagement/Unit/Unit.controller.js";

const router = express.Router();

// Create unit route
router.post("/", unitController.createUnit);

// Get all units route
router.get("/", unitController.getAllUnits);

// Get unit by ID route
router.get("/:id", unitController.getUnitById);

// Update unit by ID route
router.put("/:id", unitController.updateUnitById);

// Delete unit by ID route
router.delete("/:id", unitController.deleteUnitById);

export default router;
