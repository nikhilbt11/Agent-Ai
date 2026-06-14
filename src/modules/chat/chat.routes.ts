// Chat routes
import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware";

import { ChatController }
from "./chat.controller";

const router = Router();

const controller =
  new ChatController();

router.post(
  "/",
  authMiddleware,
  controller.ask
);

export default router;