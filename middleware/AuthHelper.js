const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")



// Pass Hashing
const SecurePassword = async (password)=>{
    try {
        const passhash = await bcrypt.hash(password, 10)
        return passhash
    }
    catch (error) {
        console.log(`error in SecurePassword ${error}`);
    }
}


// Admin
const CreateAdminToken = async (id)=>{
    try {
        const AdminToken = await JWT.sign({_id:id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
        return AdminToken
    }
    catch (error) {
        console.log(`error in CreateAdminToken ${error}`);
    }
}


// User and Employee
const CreateUserEmployeeToken = async (id)=>{
    try {
        const UserEmployeeToken = await JWT.sign({_id:id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
        return UserEmployeeToken
    }
    catch (error) {
        console.log(`error in CreateUserEmployeeToken ${error}`);
    }
}




module.exports = {SecurePassword, CreateAdminToken, CreateUserEmployeeToken}