import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];  // Corrected token extraction
        }

        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, JWT_SECRET);  // Fixed spelling mistake

        const user = await User.findById(decoded.userId);

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        req.user = user; // Attach user to request

        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

export default authorize;
