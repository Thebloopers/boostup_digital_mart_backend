import mongoose from "mongoose";
import { BaseStore } from "./BaseStore.js";

const StoreOwner = new mongoose.Schema({
  storeName: {
    type: String,
  },
  completeAddress: { type: String, required: true },
  vat_tax: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  
  storeLogo: [],
  storeCover: [],
});

const StoreOwnerModel = BaseStore.discriminator("storeowner", StoreOwner);
export default StoreOwnerModel;
