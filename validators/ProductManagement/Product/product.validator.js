

import Joi from "@hapi/joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  shortDescription: Joi.string(),
  itemImage: Joi.string(),
  itemThumbnail: Joi.string(),
  store: Joi.string().required(), // Assuming store is required
  category: Joi.string().required(), // Assuming category is required
  subcategory: Joi.string(),
  unit: Joi.string(),
  maximumPurchaseQuantityLimit: Joi.number(),
  price: Joi.number(),
  totalstock: Joi.number(),
  discounttype: Joi.string(),
  discount: Joi.number(),
  attribute: Joi.string(),
  tags: Joi.string(),
});
