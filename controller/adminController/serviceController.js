const ServiceModel = require("../../model/serviceModel")



// Service page
exports.ServicePage = async (req,res)=>{
    try {
        const result = await ServiceModel.aggregate([
            {
                $match:{isDelete:false}
            }
        ])

        res.render("admin/service",{
            data:result,
            message:req.flash("message"),
            error:req.flash("error")
        })
    }
    catch (error) {
        console.log(error);
    }
}


// Service add page
exports.ServiceAddPage = (req,res)=>{
    res.render("admin/serviceAdd")
}


// Service edit page
exports.ServiceEditPage = async (req,res)=>{
    try {
        const id = req.params.id

        const result = await ServiceModel.findById({_id:id})

        res.render("admin/serviceEdit",{
            data:result,
        })
    }
    catch (error) {
        console.log(error);
    }
}


// Create Service
exports.CreateService = async (req,res)=>{
    try {
        const {service_name,des} = req.body
        const image = req.file.path

        const NewService = await new ServiceModel({
            service_name:service_name,
            des:des,
            image:image,
        })

        const result = await NewService.save()
        req.flash("message",`${result.service_name} Service Added`)
        return res.redirect("/admin/service")
    }
    catch (error) {
        console.log(error);
    }
}


// Update Service
exports.UpdateService = async (req, res) => {
    try {
        const { service_name, des } = req.body;
        const serviceId = req.params.id; // Assuming your route has "/:id" parameter

        let updateFields = { service_name, des };

        if (req.file) {
            updateFields.image = req.file.path;
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(
            serviceId,
            updateFields,
            { new: true }
        );

        if (!updatedService) {
            req.flash("error", "Service not found");
            return res.redirect("/admin/service");
        }

        req.flash("success", `${updatedService.service_name} Service Updated`);
        return res.redirect("/admin/service");
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while updating the service");
        return res.redirect("/admin/service");
    }
};


// Service Active Button
exports.ServiceActiveButton = async (req, res) => {
    try {
        const id = req.params.id;
        const status = await ServiceModel.findById({ _id: id });

        if (status.isActive === false) {
            
            status.isActive = true;
            req.flash("message",`${status.service_name} Service is set to Active`)
        } else {
            
            status.isActive = false;
            req.flash("error",`${status.service_name} Service is set to Inactive`)
        }

        await status.save();
        return res.redirect("/admin/service");

    } catch (error) {
        console.log(error);
        res.redirect("/admin/service");
    }
};


// Delete Service
exports.DeleteSoft = async (req,res)=>{
    try {

        const id = req.params.id

        const service = await ServiceModel.findById({_id:id})

        if (service.isActive===true) {
            req.flash("error",`${service.service_name} is a Active Service`)
            return res.redirect("/admin/service")
        }

        if (service.isDelete === false) {

            service.isDelete = true

            await service.save()
            req.flash("message",`${service.service_name} Service Deleted Successfully`)
            return res.redirect("/admin/service")
        }
    }
    catch (error) {
        console.log(error);
    }
}