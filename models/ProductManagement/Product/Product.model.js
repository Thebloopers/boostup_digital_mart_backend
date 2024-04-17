import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  itemImage: [],
  itemThumbnail: [],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseStoreSchema",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  unit: {
    type: String,
  },
  maximumPurchaseQuantityLimit: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalstock: {
    type: Number,
  },
  discounttype: {
    type: String,
  },
  discount: {
    type: Number,
  },
  attribute: {
    type: String,
  },

  tags: {
    type: String,
  },
});

const ProductModel=mongoose.model("Product",productSchema)
export default ProductModel;