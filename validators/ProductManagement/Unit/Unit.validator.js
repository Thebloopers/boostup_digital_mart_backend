import Joi from "@hapi/joi";

// Validation schema for store creation
export const unitValidationSchema = Joi.object({
  unit: Joi.string().max(32).required(),
});
