import mongoose from "mongoose"


export async function connectToDb(){

    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")

    }catch(error){
        console.error("Failed to connect with database" , error);
        process.exit(1) //closing the app if db is not connected
        

    }

}