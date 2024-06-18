import { Router } from "express";
import userRouter from "./userRouter.js";
import gameRouter from "./gameRouter.js";
import userGameRouter from "./userGameRouter.js";
import authRouter from "./authRouter.js";

import { isAdmin, isAuthenticated } from "../midlewares/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ data: {message:"You are not prepAPIared!", imageUrl: "https://wow.zamimg.com/uploads/screenshots/normal/552557-illidan-tempestira-updated-model.jpg"}});
});

router.use("/", authRouter);
router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/userGames", userGameRouter);

export default router;
