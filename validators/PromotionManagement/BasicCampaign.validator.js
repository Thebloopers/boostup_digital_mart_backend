// validators/campaign.validator.js

import Joi from "joi";

// Joi validation schema for the BaseCampaign model
export const campaignValidationSchema = Joi.object({
  title: Joi.string().required(),
  shortDescription: Joi.string().required(),
  itemImage: Joi.array().items(Joi.string()), // Assuming itemImage is an array of strings (image URLs)
   startDate: Joi.date().iso(),
   endDate: Joi.date().iso(),
   startTime: Joi.date().iso(),
   endTime: Joi.date().iso(),
});
