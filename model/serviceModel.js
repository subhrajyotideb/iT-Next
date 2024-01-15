const mongoose = require("mongoose")

const ServiceSchema = new mongoose.Schema({
    service_name:{
        type:String,
        required:true,
    },
    des:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    isDelete:{
        type:Boolean,
        default:false,
    },
    isActive:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})

const ServiceModel = mongoose.model("service",ServiceSchema)
module.exports=ServiceModel