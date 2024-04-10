var mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: "__type",
  collection: "stores",
  timestamps: true,
};

const BaseStoreSchema = new mongoose.Schema(
  {
    ownerInformation: {
      firstName: {
        type: String,
        maxlenght: 32,
      },
      lastName: {
        type: String,
        maxlenght: 32,
      },
      phone: {
        type: Number,
      },
    },
    accountInformation: {
      email: {
        type: String,
        unique: true,
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
      },
    },
    newStore: {
      storeName: {
        type: String,
      },
      storeAddress: {
        type: String,
      },
      storeLogo: {
        type: String,
      },
      storeCover: {
        type: String,
      },
    },
  },
  baseOptions
);

BaseStoreSchema.virtual("accountInformation.password")
  .set(function (password) {
    this._password = password;
    this.accountInformation.salt = uuidv1();
    this.accountInformation.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

BaseStoreSchema.methods = {
  authenticate: function (plainPassword) {
    return (
      this.securePassword(plainPassword) ===
      this.accountInformation.encry_password
    );
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.accountInformation.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return console.log(error);
    }
  },
};

module.exports.BaseStore = mongoose.model("BaseStoreSchema", BaseStoreSchema);
