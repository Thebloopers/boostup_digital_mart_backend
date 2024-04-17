import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BannerSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },

  bannerType: {
    type: String,
    emum: ["Store Wise", "Item Wise", "Default"],
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "storeowner",
  },
  defaultLink: {
    type: String,
    
  },
  bannerImage: [],
});
const BannerModel = model("Banner", BannerSchema);
export default BannerModel;
