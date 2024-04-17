import mongoose from "mongoose";
const { Schema, model } = mongoose;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  zone: {
    type: String,

    required: true,
  },
  sendTo: {
    type: String,
    enum: ["Customer", "Store"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: [],
  
  Status: {
    type: Boolean,
    default: true,
  },
});
const Notification = model("Notification", NotificationSchema);
export default Notification;
