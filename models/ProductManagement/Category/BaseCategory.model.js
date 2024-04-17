
import mongoose from "mongoose";
const { Schema, model } = mongoose;
const baseOptions = {
  discriminatorKey: "__type",
  collection: "categotry",
  timestamps: true,
};
const BasecategorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    
    status: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: String,
      default: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"admin",
    },
    priority: {
      type: String,
      emum:["Normal","Medium","High"],
      default: "Normal",
    },
  },
  baseOptions
  
);
const BaseCategory = model("BaseCategory",BasecategorySchema);
export default BaseCategory;
