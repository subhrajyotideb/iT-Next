const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")


// Admin Dashboard
exports.Dashboard = async (req,res)=>{
    try {
        const user = await UserModel.countDocuments({isAdmin:"user", isDelete: false})
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
                    isDelete: false
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
                    isDelete: false
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
                    isDelete: false
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
                    service_name: "$service_info.service_name"
                }
            }
        ]);

        const mobileRepairCount = User_Data.filter(item => item.service_name === "Mobile Repair").length;

        res.json({ mobileRepairCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

