const UserModel = require("../../model/userModel")




// Dashboard Employee
exports.DashEmp = async (req,res)=>{
    try {
        const result = await UserModel.findById(req.emp._id)

        return res.render("dashEmp",{
            data:result,
            message:req.flash("message")
        })
    }
    catch (error) {
        return res.redirect("/login")
    }
}