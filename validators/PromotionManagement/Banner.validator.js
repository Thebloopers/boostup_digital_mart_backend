// validators/banner.validator.js

import Joi from "@hapi/joi";

// Joi validation schema for the Banner model
export const bannerValidationSchema = Joi.object({
  title: Joi.string().required(),
  zone: Joi.string().required(),
  bannerType: Joi.string()
    .valid("Store Wise", "Item Wise", "Default")
    .required(),
  featured: Joi.boolean().default(true),
  status: Joi.boolean().default(true),
  store: Joi.string().required(), // Assuming store is required
  defaultLink: Joi.string(),
  bannerImage: Joi.array().items(Joi.string()), // Assuming bannerImage is an array of strings (image URLs)
});
