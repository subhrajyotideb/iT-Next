const UserModel = require("../../model/userModel")
const ServiceModel = require("../../model/serviceModel")


// Admin Dashboard
exports.Dashboard = async (req,res)=>{
    try {
        const user = await UserModel.countDocuments({isAdmin:"user"})
        const PendingApplicants = await UserModel.countDocuments({isEmployee:"pending", isAdmin:"employee"})
        const SelectedApplicants = await UserModel.countDocuments({isEmployee:"select", isAdmin:"employee"})
        const RejectedApplicants = await UserModel.countDocuments({isEmployee:"reject", isAdmin:"employee"})
        const Services = await ServiceModel.countDocuments()
        const ActiveServices = await ServiceModel.countDocuments({isActive:true})
        const InactiveServices = await ServiceModel.countDocuments({isActive:false})

        return res.render("admin/dashboard",{
            user:user,
            PendingApplicants:PendingApplicants,
            SelectedApplicants:SelectedApplicants,
            RejectedApplicants:RejectedApplicants,
            Services:Services,
            ActiveServices:ActiveServices,
            InactiveServices:InactiveServices
        })
        
    }
    catch (error) {
        console.log(error);
    }
}