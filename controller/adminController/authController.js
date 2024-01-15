const UserModel = require("../../model/userModel")



const bcrypt = require("bcryptjs")
const {CreateAdminToken} = require("../../middleware/AuthHelper")


// Admin Login Page
exports.LoginPage = (req,res)=>{
    res.render("admin/login",{
        message:req.flash("message")
    })
}

// Admin Login
exports.Login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        const PasswordMatch = await bcrypt.compare(password, user.password)

        // all checking part
        if (!email || !password) {
            req.flash("message","Both Email and Password Required")
            return res.redirect("/admin/")
        }
        if (!user) {
            req.flash("message","Incorrect Email or Password")
            return res.redirect("/admin/")
        }

        if (PasswordMatch && (user.isAdmin==="admin")) {

            const token = await CreateAdminToken({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            })

            res.cookie("AdminToken",token)
            return res.redirect("/admin/dashboard")
        } else {
            req.flash("message", "Incorrect Email or Password");
            return res.redirect("/admin/");
        }

    }
    catch (error) {
        console.log(error);
        return res.redirect("/")
    }
}

// Admin Logout
exports.AdminLogout = (req,res)=>{
    res.clearCookie("AdminToken");
    res.redirect("/admin/");
}
