// validators/coupon.validator.js
import Joi from "@hapi/joi";

// Joi validation schema for the Coupon model
export const couponValidationSchema = Joi.object({
  title: Joi.string().required(),
  couponType: Joi.string()
    .valid("Store Wise", "Zone Wise", "Free Delivery", "First Order", "Default")
    .required(),
  code: Joi.string().required(),
  limitforSameUser: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  expireDate: Joi.date().iso().required(),
  discountType: Joi.string().valid("Amount($)", "Percent(%)").required(),
  discount: Joi.number().required(),
  maxDiscount: Joi.number().required(),
  minPurchase: Joi.number().required(),
  status: Joi.boolean(),
});
