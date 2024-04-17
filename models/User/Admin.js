import mongoose from "mongoose";
import {BaseUser } from "./BaseUser.js";

const AdminSchema = new mongoose.Schema({});

const AdminModel = BaseUser.discriminator("admin", AdminSchema);
export { AdminModel };
