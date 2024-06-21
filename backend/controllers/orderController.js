import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place user order for frontend
const placeOrder = async (req, res) => {
    try {
        const frontend_url = "http://localhost:5174"; 

        const { userId, items, amount, address } = req.body;
        const { image } = req.files; // Assuming the image is sent as "image" in form data

        // Save the image to the database or storage system
        // Example: const imageUrl = await saveImageToDatabase(image);

        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            receiptImage: imageUrl, // Save the image URL or any identifier
            payment: false,
        });
        await newOrder.save();
        
        // Clear cart data for the user
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Create Stripe session
        const lineItems = items.map((item) => {
            console.log("Item price:", item.new_price); 
            return {
                price_data: {
                    currency: "php",
                    product_data: { name: item.name },
                    unit_amount: item.new_price
                },
                quantity: item.quantity
            };
        });

        console.log("Line items:", lineItems);

        // const session = await stripe.checkout.sessions.create({
        //     line_items: lineItems,
        //     mode: 'payment',
        //     success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        // });

        // res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}

// users orders for frontend
const userOrders = async (req,res) =>{
    try {
        console.log("User ID:", req.body.userId); // Debug statement
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//Listng orders for admin panel
const listOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//api for update status of order
const updateStatus = async (req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder,userOrders, listOrders, updateStatus };
