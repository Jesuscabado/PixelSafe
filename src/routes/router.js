import { Router } from "express";
import userRouter from "./userRouter.js";
import gameRouter from "./gameRouter.js";
import userGameRouter from "./userGameRouter.js";
import authRouter from "./authRouter.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ data: { message: "You are not prepared!", imageUrl: "https://wow.zamimg.com/uploads/screenshots/normal/552557-illidan-tempestira-updated-model.jpg" } });
});

router.use("/", authRouter);
router.use("/users", isAuthenticated, userRouter);
router.use("/games", isAuthenticated, gameRouter);
router.use("/userGames", isAuthenticated, userGameRouter);

export default router;
