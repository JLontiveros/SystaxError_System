import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        // Remove "Bearer " prefix from token
        const token = authHeader.replace('Bearer ', '');
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: "Token expired. Please login again" });
        }
        res.json({ success: false, message: "Invalid token. Please login again" });
    }
};

export default authMiddleware;