// Define knowledge base routes here
import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware";

import { KnowledgeBaseController }
from "./knowledge-base.controller";

const router = Router();

const controller =
  new KnowledgeBaseController();

router.post(
  "/",
  authMiddleware,
  controller.create
);

router.get(
  "/",
  authMiddleware,
  controller.getAll
);

router.delete(
  "/:id",
  authMiddleware,
  controller.delete
);

export default router;