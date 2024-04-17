// validators/itemCampaign.validator.js

import Joi from "@hapi/joi";

// Joi validation schema for the ItemCampaignModel
export const itemCampaignValidationSchema = Joi.object({
  // Add fields from BaseCampaign
  title: Joi.string().required(),
  shortDescription: Joi.string().required(),
  itemImage: Joi.array().items(Joi.string()), // Assuming itemImage is an array of strings (image URLs)
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  startTime: Joi.date().iso(),
  endTime: Joi.date().iso(),

  // Additional fields specific to itemCampaignSchema
  store: Joi.string().required(),
  totalStock: Joi.number().integer().min(0),
  maximumCartQuantity: Joi.number().integer().min(0),
  category: Joi.string().required(),
  subCategory: Joi.string(),
  price: Joi.number().min(0),
  discount: Joi.number().min(0),
  discountType: Joi.string(),
  attribute: Joi.string(),
});
