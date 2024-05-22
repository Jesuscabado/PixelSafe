import { Router } from "express";
import userRouter from "./userRouter.js";
import gameRouter from "./gameRouter.js";
import userGameRouter from "./userGameRouter.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ data: "hello api" });
});

router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/userGames", userGameRouter);

export default router;
