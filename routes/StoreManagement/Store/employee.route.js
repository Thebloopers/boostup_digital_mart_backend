// routes/employee.routes.js

import express from "express";
import * as employeeController from "../../../controllers/EmployeeManagement/employee.controller.js";
import { uploadS3 } from "../../../middlewares/multer.js";
const router = express.Router();

// Create employee route
router.post(
  "/",
  uploadS3.fields([{ name: "employeeImage", maxCount: 1 }]),
  employeeController.createEmployee
);

// Get employee route
router.get("/:id", employeeController.getEmployee);

// Update employee route
router.put(
  "/:id",
  uploadS3.fields([{ name: "employeeImage", maxCount: 1 }]),
  employeeController.updateEmployee
);

// Delete employee route
router.delete("/:id", employeeController.deleteEmployee);

// Employee login route
router.post("/login", employeeController.employeeLogin);
router.post("/logout", employeeController.employeeLogout);
router.post("/forgotPassword", employeeController.forgotPassword);
router.post("/resetPassword", employeeController.resetPassword);
router.post("/changePassword/:id", employeeController.changePassword);

export default router;
