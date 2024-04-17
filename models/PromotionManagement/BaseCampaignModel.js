import mongoose from "mongoose";
const { Schema, model } = mongoose;
const baseOptions = {
  discriminatorKey: "__type",
  collection: "Campagin",
  timestamps: true,
};

const BaseCampaignSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    itemImage: [],
    startDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  baseOptions
);
const BaseCampaign = model("BaseCampaign",BaseCampaignSchema);
export default BaseCampaign;
