import { Request, Response } from "express";
import { ChatService } from "../chat/chat.service";
import { WhatsAppService } from "./whatsapp.service";
import { prisma } from "../../config/prisma";

const chatService = new ChatService();
const whatsappService = new WhatsAppService();

export class WhatsAppController {
  verifyWebhook(req: Request, res: Response) {
    const mode = req.query["hub.mode"];

    const token = req.query["hub.verify_token"];

    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  async receiveWebhook(req: Request, res: Response) {
    console.log(JSON.stringify(req.body, null, 2));
    try {
      const value = req.body?.entry?.[0]?.changes?.[0]?.value;

      const message = value?.messages?.[0];

      if (!message) {
        return res.sendStatus(200);
      }

      const phoneNumberId = value?.metadata?.phone_number_id;

      const whatsappAccount = await prisma.whatsAppAccount.findFirst({
        where: {
          phoneNumberId,
          isActive: true,
        },
      });

      if (!whatsappAccount) {
        return res.sendStatus(200);
      }

      const customerPhone = message.from;

      const customerMessage = message.text?.body;

      const answer = await chatService.ask(
        whatsappAccount.businessId,
        customerPhone,
        customerMessage,
      );

      await whatsappService.sendTextMessage(
        customerPhone,
        answer ?? "Sorry, I couldn't find an answer to your question.", // TODO: add a fallback answer in the database for this case
      );
    } catch (error) {
      console.error(error);

      return res.sendStatus(500);
    }
  }
}
