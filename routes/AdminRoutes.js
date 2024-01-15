const Route = require("express").Router()
const AuthController = require("../controller/adminController/authController")
const ServiceController = require("../controller/adminController/serviceController")
const DashBoardController = require("../controller/adminController/dashController")

const {AdminAuthVerify} = require("../middleware/AuthVerify")
const ServiceIMG = require("../utility/serviceIMG")


// Admin login
Route.get("/",AuthController.LoginPage)
Route.post("/login",AuthController.Login)
Route.get("/logout",AuthController.AdminLogout)

// Dashboard
Route.get("/dashboard",AdminAuthVerify,DashBoardController.Dashboard)

// Service
Route.get("/service",AdminAuthVerify,ServiceController.ServicePage)
Route.get("/addservice",AdminAuthVerify,ServiceController.ServiceAddPage)
Route.get("/editservice/:id",AdminAuthVerify,ServiceController.ServiceEditPage)
Route.post("/updateservice/:id",AdminAuthVerify,ServiceIMG,ServiceController.UpdateService)
Route.post("/createservice",AdminAuthVerify,ServiceIMG,ServiceController.CreateService)
Route.get("/sbutton/:id",AdminAuthVerify,ServiceController.ServiceActiveButton)
Route.get("/delete/:id",AdminAuthVerify,ServiceController.DeleteSoft)

module.exports=Route