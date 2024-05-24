import mongoose from "mongoose";

//Schema for product properties

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description:{type: String, required: true},
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true }
    
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;