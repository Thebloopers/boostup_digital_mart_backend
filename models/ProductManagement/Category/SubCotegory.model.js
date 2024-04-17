import BaseCategory from "./BaseCategory.model.js";
import mongoose from "mongoose";
const SubcategorySchema = mongoose.Schema({
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  
});
const SubCategoryModel = BaseCategory.discriminator("SubCategory", SubcategorySchema);
export default SubCategoryModel;
