import Joi from "@hapi/joi";

// Validation schema for store creation
export const CategoryCreationSchema = Joi.object({
 
  name: Joi.string().max(32).required(),
  
});
export const SubCategoryCreationSchema = Joi.object({
  name: Joi.string().max(32).required(),
  mainCategory: Joi.string().required(),
});
