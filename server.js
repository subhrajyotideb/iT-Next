const express = require("express")
const app = express()
require("dotenv").config()
const session = require("express-session")
const flash = require("connect-flash")
const cookie = require("cookie-parser")
const bodyparser = require("body-parser")
const MongoDB = require("./config/db")
const ejs = require("ejs")
const path = require("path")

// bodyparser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// session
app.use(session({
    cookie:{
        maxAge:60000,
    },
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}))

// flash
app.use(flash())

// cookie
app.use(cookie())

// setup view engine
app.set("view engine","ejs")
app.set("views","views")

// set public folder static
app.use(express.static(path.join(__dirname,"public")))

// User Image Folder
app.use("/userUpload",express.static(path.join(__dirname,"userUpload")))

// Service Image Folder
app.use("/serviceUpload",express.static(path.join(__dirname,"serviceUpload")))

// admin routes
const AdminRoutes = require("./routes/AdminRoutes")
app.use("/admin",AdminRoutes)

// ui routes
const UIroutes = require("./routes/UIroutes")
app.use(UIroutes)

// port
const port = process.env.PORT

// MongoDB
MongoDB()

// server
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
})