
import mongoose from "mongoose";


const AttributeSchema=mongoose.Schema({
    attribute:{
        type:String,
        required:true
    }
},{timestamp:true})
const AttributeModel=mongoose.model("Attribute",AttributeSchema)
export default AttributeModel;