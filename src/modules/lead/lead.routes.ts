import { Router } from "express";

import { authMiddleware }
  from "../../middleware/auth.middleware";

import { LeadController }
  from "./lead.controller";

const router = Router();

const controller =
  new LeadController();

router.get(
  "/",
  authMiddleware,
  controller.getLeads,
);

router.patch(
  "/:id/status",
  authMiddleware,
  controller.updateStatus,
);

export default router;