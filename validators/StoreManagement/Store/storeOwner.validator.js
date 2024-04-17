// validators/store.validator.js

import Joi from "@hapi/joi";

// Validation schema for store creation
export const storeCreationSchema = Joi.object({
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.number().default(0),
  storeName: Joi.string(),
  completeAddress: Joi.string().required(),
  vat_tax: Joi.string(),
  zone: Joi.string(),
  latitude: Joi.string(),
  longitude: Joi.string(),
  admin: Joi.string(),
});

// Validation schema for store update
export const storeUpdateSchema = Joi.object({
  firstName: Joi.string().max(32),
  lastName: Joi.string().max(32),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.number().default(0),
  storeName: Joi.string(),
  completeAddress: Joi.string().required(),
  vat_tax: Joi.string(),
  zone: Joi.string(),
  latitude: Joi.string(),
  longitude: Joi.string(),
  admin: Joi.string(),
});

// Validation schema for store login
export const storeLoginSchema = Joi.object({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
