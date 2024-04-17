import mongoose from "mongoose";
import { BaseUser } from "./BaseUser.js";

const AddressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
});

const UserSchema = new mongoose.Schema({
  billing: {
    type: AddressSchema,
  },
  shipping: {
    type: AddressSchema,
  },
  referCode: {
    type: String,
  },
});

const UserModel = BaseUser.discriminator("customer", UserSchema);

export { UserModel };