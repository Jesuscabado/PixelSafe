import express from "express";
import userGameApiController from "../controllers/userGames/userGameApiController.js";

const router = express.Router();

router.get("/", userGameApiController.getAll);
router.get("/:id", userGameApiController.getById);
router.post("/", userGameApiController.create);
router.put("/:id", userGameApiController.update);
router.delete("/:id", userGameApiController.remove);

export default router;
