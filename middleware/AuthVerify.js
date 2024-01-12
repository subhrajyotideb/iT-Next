const JWT = require("jsonwebtoken")


// Admin
const AdminAuthVerify = async (req,res,next)=>{
    
    const AdminToken = req.body.AdminToken || req.query.AdminToken || req.cookies.AdminToken

    if (!AdminToken) {
        console.log("token is required");
        return res.redirect("/admin/")
    }

    try {
        const decode = await JWT.verify(AdminToken, process.env.JWT_SECRET_KEY)
        req.admin = decode
        return next()
    }
    catch (error) {
        console.log(`error in AdminAuthVerify ${error}`);
        return res.redirect("/admin/")
    }
}


// User
const UserAuthVerify = async (req,res,next)=>{

    const UserToken = req.body.UserToken || req.query.UserToken || req.cookies.UserToken

    if (!UserToken) {
        console.log("token is required");
        return res.redirect("/login")
    }

    try {
        const decode = await JWT.verify(UserToken, process.env.JWT_SECRET_KEY)
        req.user = decode
        return next()
    }
    catch (error) {
        console.log(`error in UserAuthVerify ${error}`);
        return res.redirect("/login")
    }
}


// Employee
const EmployeeAuthVerify = async (req,res,next)=>{

    const EmployeeToken = req.body.EmployeeToken || req.query.EmployeeToken || req.cookies.EmployeeToken

    if (!EmployeeToken) {
        console.log("token is required");
        return res.redirect("/login")
    }

    try {
        const decode = await JWT.verify(EmployeeToken, process.env.JWT_SECRET_KEY)
        req.employee = decode
        return next()
    }
    catch (error) {
        console.log(`error in EmployeeAuthVerify ${error}`);
        return res.redirect("/login")
    }
}



module.exports = {AdminAuthVerify,UserAuthVerify,EmployeeAuthVerify}