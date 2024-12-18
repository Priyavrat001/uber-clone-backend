import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({});

const uri = process.env.MONGO_URI;


export const connectMongoDB = ()=>{
    mongoose.connect(uri).then((c)=>console.log(`mongo is running ${c.collection.name}`)).catch(e=>console.error(e.message));

};

