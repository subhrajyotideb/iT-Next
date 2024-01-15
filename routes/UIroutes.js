const Route = require("express").Router()
const TestController = require("../controller/TestPageController")
const UserDashController = require("../controller/uiController/userDashController")
const EmpDashController = require("../controller/uiController/empDashController")
const AuthController = require("../controller/uiController/authController")
const IndexController = require("../controller/uiController/indexController")
const AboutController = require("../controller/uiController/aboutController")

const {UserAuthVerify,EmployeeAuthVerify} = require("../middleware/AuthVerify")
const UserIMG = require("../utility/userIMG")




// Test Page For Design Purpose
Route.get("/test",TestController.Test)




// Index Page
Route.get("/",IndexController.Index)

// User Dashboard
Route.get("/userdash",UserAuthVerify,UserDashController.DashUser)

// Employee Dashboard
Route.get("/empdash",EmployeeAuthVerify,EmpDashController.DashEmp)

// Login, Logout, Register and email verification
Route.get("/register",AuthController.Register)
Route.get("/login",AuthController.LoginPage)
Route.post("/createlogin",AuthController.Login)
Route.post("/createuser",UserIMG,AuthController.CreateUser)
Route.get("/confirmation/:token",AuthController.Confirmation)
Route.get("/logoutuser",AuthController.LogoutUser)
Route.get("/logoutemployee",AuthController.LogoutEmployee)

// About Page
Route.get("/about",AboutController.About)

module.exports=Route