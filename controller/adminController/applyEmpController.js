const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")


// Apply Page
exports.ApplyAllPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "pending", isDelete:false });

            return res.render("admin/applyEmp", 
            { 
                data: employees,
                message:req.flash("message"),
                reject:req.flash("reject")
            });
        
    } catch (error) {
        console.log(error);
    }
};

// Edit Apply Selected Employee Page
exports.ApplySelectedEMPEditPage = async (req,res)=>{
    try {
        const id = req.params.id
        const emp = await UserModel.findOne({_id:id})

        if (emp) {
            return res.render("admin/applySelectEdit", {
                data:emp
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}


// Update Apply Selected Employee
exports.ApplyUpdateSelectedEMP = async (req,res)=>{
    try {
        const id = req.params.id
        const {name,email,phone,apply_for} = req.body

        const emp = await UserModel.findOne({_id:id})

        if (emp) {
            emp.name=name,
            emp.email=email,
            emp.phone=phone,
            emp.apply_for=apply_for
            
            if (req.file) {
                emp.image = req.file.path
            }

            await emp.save()
            req.flash("message",`${emp.name} Updated Successfully`)
            return res.redirect("/admin/select")
        } else {
            req.flash("error","Check the values! Before Update")
            return res.redirect("/admin/editselectedemp")
        }
    }
    catch (error) {
        console.log(error);
    }
}


// Selected Apply Page
exports.ApplySelectPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "select", isDelete:false }).populate("admin_service_id")

        const Service = await ServiceModel.find({isActive:true, isDelete:false})

            return res.render("admin/applySelect", 
            { 
                data: employees,
                services:Service,
                message:req.flash("message"),
                error:req.flash("error")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Rejected Apply Page
exports.ApplyRejectPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "reject", isDelete:false });

            return res.render("admin/applyReject", 
            { 
                data: employees,
                message:req.flash("message")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Select Service Employee Page
exports.SelectServicePage = async (req, res) => {
    try {
        
        const id = req.params.id

        const user = await UserModel.findOne({_id:id}).populate("admin_service_id")

        const user_name = user.name

        let service_name = "";

    if (!user.admin_service_id || !user.admin_service_id.service_name) {
        service_name = "Service not selected";
    } else {
        service_name = user.admin_service_id.service_name;
    }

        const Service = await ServiceModel.find({isActive:true, isDelete:false})

            return res.render("admin/applySelectService", 
            { 
                user_id:id,
                service:Service,
                user_name:user_name,
                service_name:service_name,
                message:req.flash("message"),
            });
        
    } catch (error) {
        console.log(error);
    }
};

// Select
exports.SelectEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const emp = await UserModel.findOne({ _id: id });

        if (emp.isEmployee === "pending") {
            emp.isEmployee = "select";

            await emp.save();
            req.flash("message",`${emp.name} Selected for next process`)
            return res.redirect("/admin/apply");
        }
    } catch (error) {
        console.log(error);
    }
};


// Reject
exports.RejectEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        const emp = await UserModel.findOne({ _id: id });

        if (emp.isEmployee === "pending") {
            emp.isEmployee = "reject";

            await emp.save();
            req.flash("reject",`${emp.name} Rejected`)
            return res.redirect("/admin/apply");
        } 
    } catch (error) {
        console.log(error);
    }
};


// Undo
exports.UndoApply = async (req,res)=>{
    try {
        const id = req.params.id
        
        const emp = await UserModel.findOne({_id:id})
        
        if (emp.isEmployee==="select") {

            emp.isEmployee="pending"

            await emp.save()
            req.flash("message",`${emp.name} Undo`)
            return res.redirect("/admin/select");

        } else if (emp.isEmployee==="reject") {

            emp.isEmployee="pending"

            await emp.save()
            req.flash("message",`${emp.name} Undo`)
            return res.redirect("/admin/reject");
        }
        
    }
    catch (error) {
        console.log(error);
    }
}


// Admin Select Service
exports.SelectService = async (req,res)=>{
    try {
        const {service_id,user_id} = req.body

        const emp = await UserModel.findOne({_id:user_id})

        const service = await ServiceModel.findOne({_id:service_id})

        

        if (emp) {
            emp.admin_service_id = service_id
            await emp.save()

            
            req.flash("message",`${emp.name} has been selected for ${service.service_name} Service`)
            return res.redirect("/admin/select")
        }
        
        
    }
    catch (error) {
        console.log(error);
    }
}

// Employee Status
exports.StatusEmp = async (req,res)=>{
    try {
        const id = req.params.id

        const User = await UserModel.findOne({_id:id})

        if (!User.admin_service_id) {
            req.flash("error",`Service not selected for ${User.name}`)
            return res.redirect("/admin/select")
        }

        if (User.isUser==="active") {
            User.isUser = "inactive"
            req.flash("error",`${User.name} status is set to Inactive`)
        } else {
            User.isUser = "active"
            req.flash("message",`${User.name} status is set to Active`)
        }

        await User.save()
        
        return res.redirect("/admin/select")
    }
    catch (error) {
        console.log(error);
    }
}