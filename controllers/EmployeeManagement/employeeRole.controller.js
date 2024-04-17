// controllers/permission.controller.js

import Permission from "../../models/EmployeeManagement/Permision/permision.model.js";
import { permisionValidationSchema } from "../../validators/EmployeeManagement/permision.validator.js";


// Create permission
export const createPermission = async (req, res) => {
  try {
    const { error } = permisionValidationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const permission = new Permission(req.body);
    const savedPermission = await permission.save();
    res.status(201).json(savedPermission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all permissions
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permission by ID
export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update permission by ID
export const updatePermissionById = async (req, res) => {
  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json(updatedPermission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete permission by ID
export const deletePermissionById = async (req, res) => {
  try {
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
