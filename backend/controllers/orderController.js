import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place user order for frontend
const placeOrder = async (req, res) => {
    try {
        const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
        const { userId, items, amount, address } = req.body;

        // Validate the input
        if (!items?.length || !amount || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        // Create order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false,
            status: 'pending'
        });
        await newOrder.save();

        // Create Stripe session
        const line_items = items.map((item) => ({
            price_data: {
                currency: "php",
                product_data: { 
                    name: item.name
                },
                unit_amount: Math.round(item.new_price * 100), // Convert to smallest currency unit
            },
            quantity: item.quantity
        }));

        // Add delivery fee
        if (amount > 0) {
            line_items.push({
                price_data: {
                    currency: "php",
                    product_data: { name: "Delivery Fee" },
                    unit_amount: 9000, // 90 PHP in cents
                },
                quantity: 1
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/success`,
            cancel_url: `${frontend_url}/cancel`,
        });

        res.json({
            success: true,
            session_url: session.url,
            orderId: newOrder._id
        });

    } catch (error) {
        console.error("Stripe session creation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error creating payment session"
        });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                status: 'paid',
                updatedAt: new Date()
            });
            
            // Clear cart data for the user
            const order = await orderModel.findById(orderId);
            if (order) {
                await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            }
            
            res.json({ success: true, message: "Payment verified" });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndUpdate(orderId, {
                status: 'cancelled',
                updatedAt: new Date()
            });
            res.json({ success: false, message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error verifying payment" 
        });
    }
};

// users orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId; // Changed from req.body.userId
        console.log("User ID:", userId);
        
        const orders = await orderModel.find({ userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching orders" 
        });
    }
};

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

export { placeOrder,userOrders, listOrders, updateStatus, verifyOrder};
