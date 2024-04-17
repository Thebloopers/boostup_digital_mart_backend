
import { v1 as uuidv1 } from "uuid";
import Category from "../../../models/ProductManagement/Category/Category.model.js";
import {CategoryCreationSchema} from "../../../validators/ProductManagement/Category/category.validator.js";
import { deleteFileFromObjectStorage } from "../../../middlewares/multer.js";
// Create category
export const createCategory = async (req, res) => {
  try {
    const data=req.body;
    const { name} = req.body;
    const { error } = CategoryCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = new Category({
      id: uuidv1(),
      name,
      image: req.files?.image?.map((doc) => doc.key),
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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
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
    const { error } = CategoryCreationSchema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = await Category.findById({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (category && category.image.length > 0) {
      await category.image.map((doc) => deleteFileFromObjectStorage(doc));
    }

    if (category && category.image.length > 0) {
      await category.image.map((doc) => deleteFileFromObjectStorage(doc));
    }
    category.name=req.body.name;
    category.image = req.files?.image?.map((doc) => doc.key);
     await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
