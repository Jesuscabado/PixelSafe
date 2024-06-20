import jwt from "jsonwebtoken";
import userController from "../controllers/users/userController.js";

const VerifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "No token provided" });
    }

    //const token = authorization.split(" ")[1];
    const token = authorization.includes("Bearer") ? authorization.split(" ")[1] : authorization;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userController.getById(decoded._id);
        if (!user) {
            return res.status(400).json({ error: " No existe el usuario" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid token, puede haber expirado" });
    }
};

const isAuthenticated = (req, res, next) => {
    VerifyToken(req, res, next);
};

const isAdmin = (req, res, next) => {
    VerifyToken(req, res, (error) => {
        if (error) {
            return next(error);
        }
        if (req.user.role !== "admin") {
            return res.status(400).json({ error: "No autorizado" });
        }
        next();
    });
};

export { isAuthenticated, isAdmin };
