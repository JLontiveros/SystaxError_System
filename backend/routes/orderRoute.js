import express from "express"
import authMiddleware from '../middleware/auth.js'
import { placeOrder, userOrders, listOrders, updateStatus, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);

export default orderRouter;