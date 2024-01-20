const UserModel = require("../../model/userModel")





// Mobile Repair Service
exports.EmpMobileRepairPage = async (req, res) => {
    try {
        
        const User_Data = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isVerified: true,
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "admin_service_id",
                    foreignField: "_id",
                    as: "service_info"
                }
            },
            {
                $unwind: "$service_info"
            },
            {
                $project: {
                    service_id: "$service_info._id",
                    service_name: "$service_info.service_name",
                    service_des: "$service_info.des",
                    service_image: "$service_info.image",
                    service_isDelete: "$service_info.isDelete",
                    service_isActive: "$service_info.isActive",
                    emp_name: "$name",
                    emp_email: "$email",
                    emp_phone: "$phone",
                    emp_image: "$image",
                    emp_isDelete: "$isDelete",
                    emp_isFeature: "$isFeature",
                    emp_isAdmin: "$isAdmin",
                    emp_isUser: "$isUser",
                    emp_isEmployee: "$isEmployee",
                    emp_apply_for: "$apply_for",
                    emp_isVerified: "$isVerified",
                    emp_isEmployee: "$isEmployee",
                }
            },
            {
                $match:{
                    service_name: "Mobile Repair",
                    service_isDelete: false,
                    service_isActive: true,
                    emp_isDelete: false,
                    emp_isUser: "active"

                }
            }
        ]);

            return res.render("admin/EmpMobileRepair", 
            { 
                data: User_Data,
                message:req.flash("message"),
                error:req.flash("error")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Feature Mobile Repair Service 
exports.FeatureEmpMobile = async (req,res)=>{
    try {
        const id = req.params.id

        const user = await UserModel.findOne({_id:id})

        if (user.isFeature===false) {
            user.isFeature=true 
            req.flash("message",`${user.name} is set to Featured`)
        } else {
            user.isFeature=false 
            req.flash("error",`${user.name} is set to Unfeatured`)
        }

        await user.save()
        res.redirect("/admin/empmobilerepair")

    }
    catch (error) {
        
    }
}


// Computer Repair Service
exports.EmpComputerRepairPage = async (req, res) => {
    try {
        
        const User_Data = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isVerified: true,
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "admin_service_id",
                    foreignField: "_id",
                    as: "service_info"
                }
            },
            {
                $unwind: "$service_info"
            },
            {
                $project: {
                    service_id: "$service_info._id",
                    service_name: "$service_info.service_name",
                    service_des: "$service_info.des",
                    service_image: "$service_info.image",
                    service_isDelete: "$service_info.isDelete",
                    service_isActive: "$service_info.isActive",
                    emp_name: "$name",
                    emp_email: "$email",
                    emp_phone: "$phone",
                    emp_image: "$image",
                    emp_isDelete: "$isDelete",
                    emp_isFeature: "$isFeature",
                    emp_isAdmin: "$isAdmin",
                    emp_isUser: "$isUser",
                    emp_isEmployee: "$isEmployee",
                    emp_apply_for: "$apply_for",
                    emp_isVerified: "$isVerified",
                    emp_isEmployee: "$isEmployee",
                }
            },
            {
                $match:{
                    service_name: "Computer Repair",
                    service_isDelete: false,
                    service_isActive: true,
                    emp_isDelete: false,
                    emp_isUser: "active"

                }
            }
        ]);

            return res.render("admin/EmpComputerRepair", 
            { 
                data: User_Data,
                message:req.flash("message"),
                error:req.flash("error")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Feature Computer Repair Service 
exports.FeatureEmpComputer = async (req,res)=>{
    try {
        const id = req.params.id

        const user = await UserModel.findOne({_id:id})

        if (user.isFeature===false) {
            user.isFeature=true 
            req.flash("message",`${user.name} is set to Featured`)
        } else {
            user.isFeature=false 
            req.flash("error",`${user.name} is set to Unfeatured`)
        }

        await user.save()
        res.redirect("/admin/empcomputerrepair")

    }
    catch (error) {
        
    }
}



// Data Recovery Service
exports.EmpDataRecoveryPage = async (req, res) => {
    try {
        
        const User_Data = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isVerified: true,
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "admin_service_id",
                    foreignField: "_id",
                    as: "service_info"
                }
            },
            {
                $unwind: "$service_info"
            },
            {
                $project: {
                    service_id: "$service_info._id",
                    service_name: "$service_info.service_name",
                    service_des: "$service_info.des",
                    service_image: "$service_info.image",
                    service_isDelete: "$service_info.isDelete",
                    service_isActive: "$service_info.isActive",
                    emp_name: "$name",
                    emp_email: "$email",
                    emp_phone: "$phone",
                    emp_image: "$image",
                    emp_isDelete: "$isDelete",
                    emp_isFeature: "$isFeature",
                    emp_isAdmin: "$isAdmin",
                    emp_isUser: "$isUser",
                    emp_isEmployee: "$isEmployee",
                    emp_apply_for: "$apply_for",
                    emp_isVerified: "$isVerified",
                    emp_isEmployee: "$isEmployee",
                }
            },
            {
                $match:{
                    service_name: "Data Recovery",
                    service_isDelete: false,
                    service_isActive: true,
                    emp_isDelete: false,
                    emp_isUser: "active"

                }
            }
        ]);

            return res.render("admin/EmpDataRecovery", 
            { 
                data: User_Data,
                message:req.flash("message"),
                error:req.flash("error")
            });
        
    } catch (error) {
        console.log(error);
    }
};


// Feature Data Recovery Service 
exports.FeatureEmpDataRecovery = async (req,res)=>{
    try {
        const id = req.params.id

        const user = await UserModel.findOne({_id:id})

        if (user.isFeature===false) {
            user.isFeature=true 
            req.flash("message",`${user.name} is set to Featured`)
        } else {
            user.isFeature=false 
            req.flash("error",`${user.name} is set to Unfeatured`)
        }

        await user.save()
        res.redirect("/admin/empdatarecovery")

    }
    catch (error) {
        
    }
}