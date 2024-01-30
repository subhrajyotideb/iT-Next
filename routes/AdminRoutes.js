const Route = require("express").Router()
const AuthController = require("../controller/adminController/authController")
const ServiceController = require("../controller/adminController/serviceController")
const DashBoardController = require("../controller/adminController/dashController")
const ApplyController = require("../controller/adminController/applyEmpController")
const UserTotalController = require("../controller/adminController/userTotalController")
const NewServiceEmpController = require("../controller/adminController/NewServiceEmpController")

const {AdminAuthVerify} = require("../middleware/AuthVerify")
const ServiceIMG = require("../utility/serviceIMG")
const EmployeeIMG = require("../utility/userIMG")


// Test API
Route.get("/api",DashBoardController.testApi)



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
Route.get("/reject",AdminAuthVerify,ApplyController.ApplyRejectPage)
Route.get("/undo/:id",AdminAuthVerify,ApplyController.UndoApply)
Route.get("/select/:id",AdminAuthVerify,ApplyController.SelectEmployee)
Route.get("/reject/:id",AdminAuthVerify,ApplyController.RejectEmployee)
Route.get("/selectservice/:id",AdminAuthVerify,ApplyController.SelectServicePage)
Route.post("/empservice",AdminAuthVerify,ApplyController.SelectService)
Route.get("/empstatus/:id",AdminAuthVerify,ApplyController.StatusEmp)
Route.get("/editselectedemp/:id",AdminAuthVerify,ApplyController.ApplySelectedEMPEditPage)
Route.post("/updateselectedemployee/:id",AdminAuthVerify,EmployeeIMG,ApplyController.ApplyUpdateSelectedEMP)


// User Total
Route.get("/usertotal",AdminAuthVerify,UserTotalController.UserTotal)
Route.get("/userdelete/:id",AdminAuthVerify,UserTotalController.DeleteSoft)
Route.get("/userstatus/:id",AdminAuthVerify,UserTotalController.StatusUser)
// Active User Total
Route.get("/activeusertotal",AdminAuthVerify,UserTotalController.UserTotalActive)
Route.get("/activeuserstatus/:id",AdminAuthVerify,UserTotalController.StatusUserActive)
// Inactive User Total
Route.get("/inactiveusertotal",AdminAuthVerify,UserTotalController.UserTotalInactive)
Route.get("/inactiveuserstatus/:id",AdminAuthVerify,UserTotalController.StatusUserInactive)
Route.get("/inactiveuserdelete/:id",AdminAuthVerify,UserTotalController.InactiveDeleteSoft)

// Employee Total
Route.get("/select",AdminAuthVerify,ApplyController.ApplySelectPage)

// Mobile Repair Employee Total
Route.get("/empmobilerepair",AdminAuthVerify,NewServiceEmpController.EmpMobileRepairPage)
Route.get("/empmobilerepairfeature/:id",AdminAuthVerify,NewServiceEmpController.FeatureEmpMobile)
// Computer Repair Employee Total
Route.get("/empcomputerrepair",AdminAuthVerify,NewServiceEmpController.EmpComputerRepairPage)
Route.get("/empcomputerrepairfeature/:id",AdminAuthVerify,NewServiceEmpController.FeatureEmpComputer)
// Data Recovery Employee Total
Route.get("/empdatarecovery",AdminAuthVerify,NewServiceEmpController.EmpDataRecoveryPage)
Route.get("/empdatarecoveryfeature/:id",AdminAuthVerify,NewServiceEmpController.FeatureEmpDataRecovery)

module.exports = Route