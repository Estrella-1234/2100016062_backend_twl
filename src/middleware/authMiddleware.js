const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authenticateToken = (req, res, next) => {
    // Get the token from the request headers or query parameters
    const token = req.headers.authorization || req.query.token;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is missing.' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, "Hakuna Matata");

        // Pass the decoded payload to the next middleware or route handler
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
