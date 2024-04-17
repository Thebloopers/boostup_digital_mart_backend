// controllers/category.controller.js
import { v1 as uuidv1 } from "uuid";
import SubCategory from "../../../models/ProductManagement/Category/SubCotegory.model.js";
import { SubCategoryCreationSchema } from "../../../validators/ProductManagement/Category/category.validator.js";
// Create categor
export const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const { name, mainCategory } = data;
    const { error } = SubCategoryCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = new SubCategory({
      id: uuidv1(),
      name,
      mainCategory,
    });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get category by ID
export const getCategory = async (req, res) => {
  try {
    const category = await SubCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const { error } = SubCategoryCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!category) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await SubCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
