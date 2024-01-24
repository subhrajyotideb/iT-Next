const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")




// Dashboard User
exports.DashUser = async (req,res)=>{
    try {
        const result = await UserModel.findById(req.user._id)

        const service = await ServiceModel.find({isActive:true, isDelete:false})

        return res.render("dashUser",{
            user:result,
            data:service,
            message:req.flash("message")
        })
    }
    catch (error) {
        return res.redirect("/login")
    }
}