const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")



// Dashboard Employee
exports.DashEmp = async (req,res)=>{
    try {
        const result = await UserModel.findById(req.emp._id)

        const service = await ServiceModel.find({isActive:true, isDelete:false})

        return res.render("dashEmp",{
            user:result,
            data:service,
            message:req.flash("message")
        })
    }
    catch (error) {
        return res.redirect("/login")
    }
}