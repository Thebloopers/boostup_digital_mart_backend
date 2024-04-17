import mongoose from "mongoose";

const permisionSchema=mongoose.Schema({
  name:{
    type:String,
  },
  permisions:[]
})

const permisionModel=mongoose.model("Permision",permisionSchema)
export default permisionModel;