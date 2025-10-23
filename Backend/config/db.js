import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://nabadipsarkar:newdatabase9898@cluster0.xwhmxeq.mongodb.net/food-del').then(()=> console.log("Db connected"))
}