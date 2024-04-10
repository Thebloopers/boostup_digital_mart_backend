import mongoose from "mongoose";
import crypto from "crypto";
import { v1 as uuidv1 } from "uuid";

const baseOptions = {
  discriminatorKey: "__type",
  collection: "users",
  timestamps: true,
};

const BaseUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlenght: 32,
    },
    lastName: {
      type: String,
      maxlenght: 32,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: {
      type: String,
    },
    encry_password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  baseOptions
);

BaseUserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

BaseUserSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      console.log(error);
      return ""; // return an empty string on error
    }
  },
};

const BaseUser = mongoose.model("BaseUserSchema", BaseUserSchema);

export { BaseUser }; // Export the BaseUser model
