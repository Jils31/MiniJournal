import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{dbName:"MiniJournal"})
        .then(()=>console.log("MongoDB connected", mongoose.connection.db.databaseName))
    }catch(error){
        console.log("Error connecting to the database: "+error)
        process.exit(1)
    }
}

export default connectDb