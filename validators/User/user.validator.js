// userValidation.js
import Joi from "@hapi/joi";

// Validate the user data
export function validateCreateUser(userData) {
  const userSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$"
        )
      )
      .messages({
        "string.min": `Password should have at least {{#limit}} characters`,
        "string.pattern.base": `Password must be between 8 and 1024 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.`,
      }),
    phone: Joi.number().min(1000000000).max(9999999999),
  });

  const { error } = userSchema.validate(userData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateUser(updateData) {
  const userSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    phone: Joi.number(),
  });

  const { error } = userSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}
