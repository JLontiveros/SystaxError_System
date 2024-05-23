const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect('mongodb+srv://eatpiemordecai:Jlro122002@cluster0.ovgopb0.mongodb.net/SYSTAXERROR_SYSTEM')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve images statically
app.use('/images', express.static('upload/images'));

// Endpoint to upload an image
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Product Schema
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
});

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data = { user: { id: user._id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = { user: { id: user._id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(-8);
    res.send(newcollection);
});

app.get('/popularincat', async (req, res) => {
    let products = await Product.find({ category: "cat" });
    let popular_in_cat = products.slice(0, 4);
    res.send(popular_in_cat);
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid account" });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid account" });
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
});

app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).send({ errors: "User not found" });
    }
    res.json(userData.cartData);
});

// Order Schema and Model
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            _id: false,
            id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    deliveryInfo: {
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    image: { type: String, required: true },
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.post('/placeorder', upload.single('image'), fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, totalAmount, deliveryInfo } = req.body;

        // Parse the items JSON string into an array of objects
        const parsedItems = JSON.parse(items);

        const order = new Order({
            userId,
            items: parsedItems.map(item => ({
                id: mongoose.Types.ObjectId(item.id), // Make sure to include the item ID
                name: item.name,
                quantity: item.quantity
            })),
            totalAmount,
            deliveryInfo: JSON.parse(deliveryInfo),
            image: req.file ? `http://localhost:${port}/images/${req.file.filename}` : null
        });

        if (!order.image) {
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        await order.save();
        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
});

app.get('/placeorder', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name');
        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            items: order.items.map(item => ({
                id: item.id, // Ensure item ID is included
                name: item.name,
                quantity: item.quantity
            }))
        }));
        res.json(formattedOrders);
    } catch (error) {
        console.error('Failed to fetch orders:', error.stack);  // Improved logging
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
