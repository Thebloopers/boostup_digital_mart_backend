// routes/permission.routes.js

import express from "express";
import * as permissionController from "../../../controllers/EmployeeManagement/employeeRole.controller.js";

const router = express.Router();

// Create permission route
router.post("/", permissionController.createPermission);

// Get all permissions route
router.get("/", permissionController.getAllPermissions);

// Get permission by ID route
router.get("/:id", permissionController.getPermissionById);

// Update permission by ID route
router.put("/:id", permissionController.updatePermissionById);

// Delete permission by ID route
router.delete("/:id", permissionController.deletePermissionById);

export default router;
