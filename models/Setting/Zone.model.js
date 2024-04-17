import mongoose from "mongoose";

const ZoneSchema = mongoose.Schema(
  {
    zone: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);
const ZoneModel = mongoose.model("zone", ZoneSchema);
export default ZoneModel;
