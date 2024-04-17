import mongoose from "mongoose";
import crypto from "crypto";
import { v1 as uuidv1 } from "uuid";

const baseOptions = {
  discriminatorKey: "__type",
  collection: "stores",
  timestamps: true,
};

const BaseStoreSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlenght: 32,
    },
    lastName: {
      type: String,
      maxlenght: 32,
    },

    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    encry_password: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    permisions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permision",
      },
    ],
  },
  baseOptions
);

BaseStoreSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

BaseStoreSchema.methods = {
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
      return console.log(error);
    }
  },
};
export const BaseStore = mongoose.model("BaseStoreSchema", BaseStoreSchema);
