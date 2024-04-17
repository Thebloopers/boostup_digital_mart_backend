import Joi from "@hapi/joi";

// Validation schema for store creation
export const attributeValidationSchema = Joi.object({
  attribute: Joi.string().max(32).required(),
});
