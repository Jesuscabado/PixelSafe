import {Router} from "express";

import userApiController from "../controllers/users/userApiController.js";

const router = Router();

router.post("/login", userApiController.login);
router.post("/register", userApiController.register);

export default router