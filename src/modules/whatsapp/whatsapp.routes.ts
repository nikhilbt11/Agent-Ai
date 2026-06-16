// src/modules/whatsapp/whatsapp.routes.ts

import { Router } from "express";
import { WhatsAppController } from "./whatsapp.controller";

const router = Router();

const controller =
  new WhatsAppController();

router.get(
  "/webhook",
  controller.verifyWebhook,
);

router.post(
  "/webhook",
  controller.receiveWebhook,
);

export default router;