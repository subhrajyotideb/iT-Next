const UserModel = require("../../model/userModel")


// Total User Page
exports.UserTotal = async (req,res)=>{
    try {

        const user = await UserModel.aggregate([
            {
                $match:{
                    isDelete:false,
                    isAdmin:"user",
                    isVerified:true,
                }
            }

        ])

        return res.render("admin/userTotal",{
            data:user,
            message:req.flash("message"),
            error:req.flash("error")
        })
    }
    catch (error) {
        console.log(error);
    }
}





// User Status
exports.StatusUser = async (req,res)=>{
    try {
        const id = req.params.id

        const User = await UserModel.findOne({_id:id})

        if (User.isUser==="active") {
            User.isUser = "inactive"
        } else {
            User.isUser = "active"
        }

        await User.save()
        req.flash("message",`${User.name} status changed`)
        return res.redirect("/admin/usertotal")
    }
    catch (error) {
        console.log(error);
    }
}


// Delete User
exports.DeleteSoft = async (req,res)=>{
    try {

        const id = req.params.id

        const user = await UserModel.findById({_id:id})

        if (user.isUser==="active") {
            req.flash("error",`${user.name} is a active user`)
            return res.redirect("/admin/usertotal")
        }

        if (user.isDelete === false) {

            user.isDelete = true

            await user.save()
            req.flash("error",`${user.name} Deleted Successfully`)
            return res.redirect("/admin/usertotal")
        }
    }
    catch (error) {
        console.log(error);
    }
}