const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")


// Admin Dashboard
exports.Dashboard = async (req,res)=>{
    try {
        const user = await UserModel.countDocuments({isAdmin:"user", isDelete: false})
        const activeuser = await UserModel.countDocuments({isAdmin:"user", isDelete: false, isUser:"active"})
        const inactiveuser = await UserModel.countDocuments({isAdmin:"user", isDelete: false, isUser:"inactive"})
        const PendingApplicants = await UserModel.countDocuments({isEmployee:"pending", isAdmin:"employee", isDelete: false})
        const SelectedApplicants = await UserModel.countDocuments({isEmployee:"select", isAdmin:"employee", isDelete: false})
        const RejectedApplicants = await UserModel.countDocuments({isEmployee:"reject", isAdmin:"employee", isDelete: false})
        const Services = await ServiceModel.countDocuments()
        

// Mobile       
        const MobileRepair = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isUser:"active"
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
                    service_name: "$service_info.service_name",
                    active: "$service_info.isActive"
                }
            }
        ]);

        const mobileRepairCount = MobileRepair.filter(item => (item.service_name === "Mobile Repair") && (item.active === true)).length;

// Computer
        const ComputerRepair = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isUser:"active"
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
                    service_name: "$service_info.service_name",
                    active: "$service_info.isActive"
                }
            }
        ]);

        const ComputerRepairCount = ComputerRepair.filter(item => (item.service_name === "Computer Repair") && (item.active === true)).length;

        // console.log(ComputerRepairCount);


        // Data Recovery
        const DataRecovery = await UserModel.aggregate([
            {
                $match: {
                    isEmployee: "select",
                    isAdmin: "employee",
                    isDelete: false,
                    isUser:"active"
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
                    service_name: "$service_info.service_name",
                    active: "$service_info.isActive"
                }
            }
        ]);

        const DataRecoveryCount = DataRecovery.filter(item => (item.service_name === "Data Recovery") && (item.active === true)).length;

        // console.log(DataRecoveryCount);


        const ActiveServices = await ServiceModel.countDocuments({isActive:true})
        const InactiveServices = await ServiceModel.countDocuments({isActive:false})
        

        return res.render("admin/dashboard",{
            user:user,
            PendingApplicants:PendingApplicants,
            SelectedApplicants:SelectedApplicants,
            RejectedApplicants:RejectedApplicants,
            Services:Services,
            ActiveServices:ActiveServices,
            InactiveServices:InactiveServices,
            mobileRepairCount:mobileRepairCount,
            ComputerRepairCount:ComputerRepairCount,
            activeuser:activeuser,
            inactiveuser:inactiveuser,
            DataRecoveryCount:DataRecoveryCount

        })
        
    }
    catch (error) {
        console.log(error);
    }
}






// Test API
exports.testApi = async (req, res) => {
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

        

        res.json({ User_Data });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

