// controllers/unit.controller.js

import Unit from "../../../models/ProductManagement/Unit/Unit.model.js";
import {unitValidationSchema} from "../../../validators/ProductManagement/Unit/Unit.validator.js";

// Create unit
export const createUnit = async (req, res) => {
  try {
    // Validate request body
    const { error } = unitValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new unit
    const unit = new Unit(req.body);
    const savedUnit = await unit.save();
    res.status(201).json(savedUnit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all units
export const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get unit by ID
export const getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById({_id:req.params.id});
    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update unit by ID
export const updateUnitById = async (req, res) => {
  try {
    // Validate request body
    const { error } = unitValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUnit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete unit by ID
export const deleteUnitById = async (req, res) => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
    if (!deletedUnit) {
      return res.status(404).json({ error: "Unit not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
