const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    try {
        console.log("========== AUTH DEBUG ==========");
        console.log("Origin:", req.headers.origin);
        console.log("Cookie header:", req.headers.cookie);
        console.log("Parsed cookies:", req.cookies);

        const token = req.cookies?.token;

        console.log("Token exists:", !!token);

        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded user:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = authenticateUser;
