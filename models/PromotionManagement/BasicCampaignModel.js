import mongoose from "mongoose";
import BaseCampaign from "./BaseCampaignModel.js";

const BaseCampaignSchema = new mongoose.Schema({});

const BasicCampaignModel = BaseCampaign.discriminator(
  "BasicCampaign",
  BaseCampaignSchema
);
export default BasicCampaignModel;
