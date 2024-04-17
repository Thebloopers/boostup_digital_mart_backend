import mongoose from "mongoose";
import BaseCampaign from "./BaseCampaignModel.js";

const itemCampaignSchema = mongoose.Schema(
   {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "storeowner",
    },
    totalStock: {
      type: Number,
    },
    maximumCartQuantity: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    discountType: {
      type: Number,
    },
    attribute: {
      type: String,
    },
    
  },
  
);
const ItemCampaignModel = BaseCampaign.discriminator(
  "itemCampaign",
  itemCampaignSchema
);
export default ItemCampaignModel;