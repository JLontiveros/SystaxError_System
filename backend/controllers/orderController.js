import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const exchangeRate = 50;

// Place user order for frontend
const placeOrder = async (req, res) => {
    try {
        const frontend_url = "http://localhost:5173"; 

        // Stringify the address object before saving it
        const address = JSON.stringify(req.body.address);

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: address,
            payment: false,
        });
        await newOrder.save();
        
        // Clear cart data for the user
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


        
        // Create Stripe session
        const lineItems = req.body.items.map((item) => {
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



export { placeOrder,userOrders };
