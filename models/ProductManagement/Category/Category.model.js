import BaseCategory from "./BaseCategory.model.js";
import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  image: [],
});
const CategoryModel =BaseCategory.discriminator("Category",categorySchema);
export default CategoryModel;