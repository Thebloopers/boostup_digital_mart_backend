var mongoose = require("mongoose");
const { BaseStore } = require("./BaseStore");

const StoreEmployee = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  Address: {
    completeAddress: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    phone: String,
    mobile: { type: String, required: true },
  },
});

const StoreEmployeeModel = BaseStore.discriminator("storeemployee", StoreEmployee);
module.exports = { StoreEmployeeModel };