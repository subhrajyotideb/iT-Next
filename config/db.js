const mongoose = require("mongoose")

const MongoDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT)
        console.log(`MongoDB connected ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`error in MongoDB ${error}`);
    }
}

module.exports=MongoDB