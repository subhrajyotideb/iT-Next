const Route = require("express").Router()
const AuthController = require("../controller/adminController/authController")
const ServiceController = require("../controller/adminController/serviceController")
const DashBoardController = require("../controller/adminController/dashController")
const ApplyController = require("../controller/adminController/applyController")

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


// Apply
Route.get("/apply",AdminAuthVerify,ApplyController.ApplyAllPage)
Route.get("/select",AdminAuthVerify,ApplyController.ApplySelectPage)
Route.get("/reject",AdminAuthVerify,ApplyController.ApplyRejectPage)
Route.get("/undo/:id",AdminAuthVerify,ApplyController.UndoApply)
Route.get("/select/:id",AdminAuthVerify,ApplyController.SelectEmployee)
Route.get("/reject/:id",AdminAuthVerify,ApplyController.RejectEmployee)


module.exports=Route