const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")



const {SecurePassword,CreateUserEmployeeToken} = require("../../middleware/AuthHelper")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")







// Register page
exports.Register = async (req,res)=>{
    try {

        const result = await ServiceModel.find({isActive:true})

        res.render("register",{
            data:result,
            message:req.flash("message")
        })
    }
    catch (error) {
        console.log(error);
    }
}

// Create User and Employee
exports.CreateUser = async(req,res)=>{
    try {
        const {name,email,phone,password,forget,isAdmin,isEmployee,apply_for,isDelete,isUser,isFeature} = req.body
        const image = req.file.path
        const HashPass = await SecurePassword(password)

        const exist = await UserModel.findOne({
            $or:[
                {email:email},
                {phone:phone}
            ]
        })

        if (exist) {
            req.flash("message","Email or phone already exists. Please use a different email or phone.")
            return res.redirect("/register")
        }

        const NewUser = await new UserModel({
            name:name,
            email:email,
            phone:phone,
            password:HashPass,
            forget:forget,
            isAdmin:isAdmin,
            image:image,
            isEmployee:isEmployee,
            apply_for:apply_for,
            
            isDelete:isDelete,
            isUser:isUser,
            isFeature:isFeature,
            token : crypto.randomBytes(16).toString('hex')
        })

        const result = await NewUser.save();

        const tokenSaved = result.token
        const emailSaved = result.email

        if (tokenSaved) {
            const transPorter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                }
            });
            
            const mailOptions = {
                from: 'mailto:no-reply@subhrajyoti.com',
                to: emailSaved,
                subject: 'Account Verification',
                html: `
                    <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
                        <h2 style="color: #223A66;">Hello ${name},</h2>
                        <p style="font-size: 16px; color: #333;">Thank you for registering with us! 🎉</p>
                        <p style="font-size: 16px; color: #333;">
                            To complete your registration and unlock the full potential of our platform, please verify your account by clicking the link below:
                        </p>
                        <a href="http://${req.headers.host}/confirmation/${encodeURIComponent(tokenSaved)}"
                            style="display: inline-block; padding: 10px 20px; background-color: #E12454; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">
                            Verify Your Account
                        </a>
                        
                        <p style="font-size: 16px; color: #333;">Welcome to our community, and we're excited to have you on board!</p>
                        <div class="logo-text" style="font-size: 16px; color: #333; text-align: center;">
                        Best regards,<br>
                        <img src="https://res.cloudinary.com/ddunssnvi/image/upload/v1705143751/f2vqwvblz9tsmbxhiusq.png" alt="Logo" style="width: 40px; height: 40px;">
                        </div>
                        <div class="credits" style="text-align: center;">
                        Project Developed by <a href="https://www.linkedin.com/in/subhrajyoti-debnath-3bb3b6284/" target="_blank">Mr. Subhrajyoti Debnath.</a>
    </div>


                    </div>
                `,
            };
            
            
            transPorter.sendMail(mailOptions);


            req.flash("message","Verification link sent to your email!")
            return res.redirect("/login")
            
           }

    }
    catch (error) {
        console.log(error);
        return res.redirect("/register")
    }
}

// Verify Confirmation
exports.Confirmation = async (req, res) => {
    try {
        const token_id = req.params.token;
        const user = await UserModel.findOne({ token: token_id });

        if (!user || !user.email || !user.token) {
            return res.render("verifyexpire")

        } else if (user.isVerified === true) {
            return res.render("verifyalready");
        } else {
            // Update user.isVerified to true
            user.isVerified = true;

            // Save the updated user
            await user.save();

            // Debugging: Log the host to check if it's correct
            // console.log("Host:", req.headers.host);

            // Render the verification page
            res.render("verify", {
                data: user.name,
            });
        }
    } catch (error) {
        console.log("Error in confirmation:", error);
    }
};

// Login page
exports.LoginPage = async (req,res)=>{
    try {
        const result = await ServiceModel.find({isActive:true})

        res.render("login",{
            data:result,
            message:req.flash("message")
        })
    }
    catch (error) {
        console.log(error);
    }
}

// Create Login
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.flash("message", "Both Email and Password Required");
            return res.redirect("/login");
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            req.flash("message", "Incorrect Email or Password");
            return res.redirect("/login");
        }

        if (user.isVerified===false) {
            req.flash("message", "Please verify your email before logging in")
            return res.redirect("/login");
        }

        if (user.isUser==="inactive") {
            req.flash("message", "Oops! It seems you're currently unable to access our services. Kindly get in touch with our support team for assistance. Thank you!")
            return res.redirect("/login");
        }


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch && (user.isAdmin === "user")) {
            const token = await CreateUserEmployeeToken({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            });

            res.cookie("UserToken", token);
            req.flash("message",`Welcome ${user.name}`)
            return res.redirect("/userdash");

        } else if (passwordMatch && (user.isAdmin === "employee")) {
            const token = await CreateUserEmployeeToken({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                image: user.image,
            });

            res.cookie("EmployeeToken", token);
            req.flash("message",`Welcome ${user.name}`)
            return res.redirect("/empdash");
        } else {
            req.flash("message", "Incorrect Email or Password");
            return res.redirect("/login");
        }

    } catch (error) {
        console.error(error);
        req.flash("message", "Check Your Email and Password");
        res.redirect("/login");
    }
}

// Logout User
exports.LogoutUser = (req,res)=>{
    res.clearCookie("UserToken")
    res.redirect("/login")
}

// Logout Employee 
exports.LogoutEmployee = (req,res)=>{
    res.clearCookie("EmployeeToken")
    res.redirect("/login")
}
