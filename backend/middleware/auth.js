import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        // Get authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: "Not authorized. Please provide a valid token" 
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Token not found" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to request
        req.userId = decoded.id;  // Store directly in req.userId instead of req.body
        req.user = decoded;       // Store full decoded token if needed
        
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: "Token expired. Please login again" 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token. Please login again" 
            });
        }

        return res.status(500).json({ 
            success: false, 
            message: "Authentication error" 
        });
    }
};

export default authMiddleware;