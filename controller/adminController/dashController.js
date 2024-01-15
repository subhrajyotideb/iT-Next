const UserModel = require("../../model/userModel")


// Admin Dashboard
exports.Dashboard = (req,res)=>{
    res.render("admin/dashboard")
}