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
    isAdmin: {
        type: String,
        enum: ["admin", "user", "employee"],
        default: "user",
    },
    isEmployee:{
        type:String,
        enum:["active","pending","reject","feature","unfeature"],
        default:"pending",
    },
    apply_for:{
        type:String,
    },
    admin_service_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service",
        default: null,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        default:Date.now(),
        index:{
            expires:864000
        }
    }
},{
    timestamps:true
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
