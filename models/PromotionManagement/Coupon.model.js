import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CoupanSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  couponType: {
    type: String,
    emun: [
      "Store Wise",
      "Zone Wise",
      "Free Delivery",
      "First Order",
      "Default",
    ],
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  limitforSameUser: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  discountType: {
    type: String,
    enum: ["Amount($)", "Percent(%)"],
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  maxDiscount: {
    type: Number,
    required: true,
  },
  minPurchase: {
    type: Number,
    required: true,
  },
  Status: {
    type: Boolean,
    default: true,
  },
});
const Coupan = model("Coupan", CoupanSchema);
export default Coupan;
