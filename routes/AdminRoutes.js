const Route = require("express").Router()
const AdminController = require("../controller/AdminController")
const {AdminAuthVerify} = require("../middleware/AuthVerify")


// Admin login
Route.get("/",AdminController.LoginPage)
Route.post("/login",AdminController.Login)
Route.get("/logout",AdminController.AdminLogout)

// Dashboard
Route.get("/dashboard",AdminAuthVerify,AdminController.Dashboard)

module.exports=Route