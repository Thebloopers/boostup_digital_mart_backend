import Joi from "@hapi/joi";


// Validation schema for store creation
export const permisionValidationSchema = Joi.object({
  name: Joi.string().required(),
  permisions: Joi.string().required(),
});
export const givePermisionValidationSchema = Joi.object({
  userId: Joi.string().required(),
  permisionId: Joi.string().required(),
});
