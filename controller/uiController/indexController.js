const ServiceModel = require("../../model/serviceModel")
const UserModel = require("../../model/userModel")








// Home Page
exports.Index= async (req,res)=>{
    try {
        // All Services
        const service = await ServiceModel.aggregate([
            {
                $match:{
                    isActive:true,
                    isDelete:false
                }
            }
        ])

        // Customer -> Users total
        const user = await UserModel.countDocuments({isAdmin:"user", isDelete: false})

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


        return res.render("index",{
            data:service,
            mobileRepairCount:mobileRepairCount,
            DataRecoveryCount:DataRecoveryCount,
            ComputerRepairCount:ComputerRepairCount,
            customer:user,
        })
    }
    catch (error) {
        console.log(error);
    }
}
