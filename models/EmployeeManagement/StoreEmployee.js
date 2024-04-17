
import mongoose from 'mongoose'
import { BaseStore } from "../StoreManagement/Store/BaseStore.js";

const StoreEmployee = new mongoose.Schema({
  employeeImage: [],
  permisions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permision",
  }],
});

const StoreEmployeeModel = BaseStore.discriminator("storeemployee", StoreEmployee);
export default StoreEmployeeModel;