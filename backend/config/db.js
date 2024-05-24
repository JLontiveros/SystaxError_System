import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://eatpiemordecai:ecommerce@cluster0.6alx1yg.mongodb.net/e-commerce').then(()=>console.log("DB Connected"));
}