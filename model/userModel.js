const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    forget: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isDelete:{
        type:Boolean,
        default:false,
    },
    isFeature:{
        type:Boolean,
        default:false,
    },
    isAdmin: {
        type: String,
        enum: ["admin", "user", "employee"],
        default: "user",
    },
    isUser: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    isEmployee:{
        type:String,
        enum:["pending","select","reject"],
        default:"pending",
    },
    apply_for: {
        type: String,
    },    
    admin_service_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
        required:true,
    }
},{
    timestamps:true
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
