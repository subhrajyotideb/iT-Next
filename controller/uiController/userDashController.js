const UserModel = require("../../model/userModel")





// Dashboard User
exports.DashUser = async (req,res)=>{
    try {
        const result = await UserModel.findById(req.user._id)

        return res.render("dashUser",{
            data:result,
            message:req.flash("message")
        })
    }
    catch (error) {
        return res.redirect("/login")
    }
}