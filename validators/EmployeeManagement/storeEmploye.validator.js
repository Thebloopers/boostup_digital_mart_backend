// validators/store.validator.js

import Joi from "@hapi/joi";

// Validation schema for store creation
export const employeeCreationSchema = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.number().default(0),
  completeAddress: Joi.string().required(),
  zone: Joi.string().required(),
  admin: Joi.string().required(),
});

// Validation schema for store update
export const employeeUpdateSchema = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  phone: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.number().default(0),
  storeName: Joi.string().required(),
  completeAddress: Joi.string().required(),
  zone: Joi.string().required(),
  employeeImage: Joi.string().required(),
  admin: Joi.string().required(),
});

// Validation schema for store login
export const employeeLoginSchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
