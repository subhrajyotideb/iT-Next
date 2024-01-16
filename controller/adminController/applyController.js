const UserModel = require("../../model/userModel")



// Apply Page
exports.ApplyAllPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "pending" });

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


// Selected Apply Page
exports.ApplySelectPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "select" });

            return res.render("admin/applySelect", 
            { 
                data: employees,
                message:req.flash("message")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Rejected Apply Page
exports.ApplyRejectPage = async (req, res) => {
    try {
        const employees = await UserModel.find({ isVerified: true, isAdmin: "employee", isEmployee: "reject" });

            return res.render("admin/applyReject", 
            { 
                data: employees,
                message:req.flash("message")
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