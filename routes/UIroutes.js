const Route = require("express").Router()
const UIcontroller = require("../controller/UIcontroller")
const {UserAuthVerify,EmployeeAuthVerify} = require("../middleware/AuthVerify")
const UserIMG = require("../utility/userIMG")


// Test
Route.get("/test",UIcontroller.Test)


// User and Employee Dashboard
Route.get("/userdash",UserAuthVerify,UIcontroller.DashUser)
Route.get("/empdash",EmployeeAuthVerify,UIcontroller.DashEmp)

// Login, Logout, Register and email verification
Route.get("/register",UIcontroller.Register)
Route.get("/login",UIcontroller.LoginPage)
Route.post("/createlogin",UIcontroller.Login)
Route.post("/createuser",UserIMG,UIcontroller.CreateUser)
Route.get("/confirmation/:token",UIcontroller.Confirmation)
Route.get("/logoutuser",UIcontroller.LogoutUser)
Route.get("/logoutemployee",UIcontroller.LogoutEmployee)

Route.get("/",UIcontroller.Index)
Route.get("/about",UIcontroller.About)

module.exports=Route