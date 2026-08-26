import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
};

export default protect;