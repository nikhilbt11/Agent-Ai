// Define conversation routes here
import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { ConversationController } from "./conversation.controller";

const router = Router();

const controller =
  new ConversationController();

router.get(
  "/",
  authMiddleware,
  controller.getConversations
);

router.get(
  "/:id/messages",
  authMiddleware,
  controller.getMessages
);

export default router;