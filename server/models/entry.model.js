import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date:{
        type:Date,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Entry = mongoose.model("Entry", entrySchema)
export default Entry