import { Router } from "express";

import { authMiddleware }
  from "../../middleware/auth.middleware";

import { DashboardController }
  from "./dashboard.controller";

const router = Router();

const controller =
  new DashboardController();

router.get(
  "/stats",
  authMiddleware,
  controller.getStats,
);

router.get(
  "/recent-leads",
  authMiddleware,
  controller.getRecentLeads,
);

router.get(
  "/recent-conversations",
  authMiddleware,
  controller.getRecentConversations,
);

export default router;