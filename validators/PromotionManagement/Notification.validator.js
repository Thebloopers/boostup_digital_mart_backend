// validators/notification.validator.js

import Joi from "@hapi/joi";

// Joi validation schema for the Notification model
export const notificationValidationSchema = Joi.object({
  title: Joi.string().required(),
  zone: Joi.string().required(),
  sendTo: Joi.string().valid("Customer", "Store").required(),
  description: Joi.string().required(),
  image: Joi.array().items(Joi.string()),
  status: Joi.boolean(),
});
