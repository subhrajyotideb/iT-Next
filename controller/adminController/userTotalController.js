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


// Active Users
exports.UserTotalActive = async (req,res)=>{
    try {

        const user = await UserModel.aggregate([
            {
                $match:{
                    isDelete:false,
                    isAdmin:"user",
                    isVerified:true,
                    isUser:"active"
                }
            }

        ])

        return res.render("admin/userTotalActive",{
            data:user,
            message:req.flash("message"),
            error:req.flash("error")
        })
    }
    catch (error) {
        console.log(error);
    }
}


// Inactive Users
exports.UserTotalInactive = async (req,res)=>{
    try {

        const user = await UserModel.aggregate([
            {
                $match:{
                    isDelete:false,
                    isAdmin:"user",
                    isVerified:true,
                    isUser:"inactive"
                }
            }

        ])

        return res.render("admin/userTotalInactive",{
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

        const result = await User.save()

        if (result.isUser==="active") {

            req.flash("message",`${User.name} is set to Active`)
            return res.redirect("/admin/usertotal")
        } else {
            req.flash("error",`${User.name} is set to Inactive`)
            return res.redirect("/admin/usertotal")
        }


    }
    catch (error) {
        console.log(error);
    }
}

// Active User Status
exports.StatusUserActive = async (req,res)=>{
    try {
        const id = req.params.id

        const User = await UserModel.findOne({_id:id})

        if (User.isUser==="active") {
            User.isUser = "inactive"
            await User.save()
            req.flash("message",`${User.name} is set to Inactive`)
            return res.redirect("/admin/activeusertotal")
        }

    }
    catch (error) {
        console.log(error);
    }
}


// Inactive User Status
exports.StatusUserInactive = async (req,res)=>{
    try {
        const id = req.params.id

        const User = await UserModel.findOne({_id:id})

        if (User.isUser==="inactive") {
            User.isUser = "active"
            await User.save()
            req.flash("message",`${User.name} is set to Active`)
            return res.redirect("/admin/inactiveusertotal")
        }

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
            req.flash("error",`${user.name} is a Active user`)
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


// Inactive Delete User
exports.InactiveDeleteSoft = async (req,res)=>{
    try {

        const id = req.params.id

        const user = await UserModel.findById({_id:id})

        if (user.isUser==="active") {
            req.flash("error",`${user.name} is a Active user`)
            return res.redirect("/admin/inactiveusertotal")
        }

        if (user.isDelete === false) {

            user.isDelete = true

            await user.save()
            req.flash("error",`${user.name} Deleted Successfully`)
            return res.redirect("/admin/inactiveusertotal")
        }
    }
    catch (error) {
        console.log(error);
    }
}