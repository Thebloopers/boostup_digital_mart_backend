// controllers/attribute.controller.js

import Attribute from "../../../models/ProductManagement/Attribute/Attribute.model.js";
import { attributeValidationSchema } from "../../../validators/ProductManagement/Attribute/Attribute.validator.js";

// Create attribute
export const createAttribute = async (req, res) => {
  try {
    // Validate request body
    const { error } = attributeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new attribute
    const attribute = new Attribute(req.body);
    const savedAttribute = await attribute.save();
    res.status(201).json(savedAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all attributes
export const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attribute by ID
export const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ error: "Attribute not found" });
    }
    res.status(200).json(attribute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update attribute by ID
export const updateAttributeById = async (req, res) => {
  try {
    // Validate request body
    const { error } = attributeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedAttribute = await Attribute.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedAttribute) {
      return res.status(404).json({ error: "Attribute not found" });
    }
    res.status(200).json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete attribute by ID
export const deleteAttributeById = async (req, res) => {
  try {
    const deletedAttribute = await Attribute.findByIdAndDelete(req.params.id);
    if (!deletedAttribute) {
      return res.status(404).json({ error: "Attribute not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
