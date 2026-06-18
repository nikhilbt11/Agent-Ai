import { Request, Response } from "express";
import { ChatService } from "../chat/chat.service";
import { WhatsAppService } from "./whatsapp.service";
import { prisma } from "../../config/prisma";
import { ConversationService } from "../conversation/conversation.service";
import { LeadService } from "../lead/lead.service";

const chatService = new ChatService();
const whatsappService = new WhatsAppService();
const conversationService = new ConversationService();
const leadService = new LeadService();

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
    console.log("Webhook Hit");
    try {
      const value = req.body?.entry?.[0]?.changes?.[0]?.value;

      if (!value) {
        return res.sendStatus(200);
      }

      const message = value.messages?.[0];

      if (!message) {
        return res.sendStatus(200);
      }

      const phoneNumberId = value.metadata?.phone_number_id;

      const customerPhone = message.from;

      const customerMessage = message.text?.body;

      console.log({
        phoneNumberId,
        customerPhone,
        customerMessage,
      });

      const whatsappAccount: any = await prisma.whatsAppAccount.findFirst({
        where: {
          phoneNumberId,
          isActive: true,
        },
      });

      const customerName = value.contacts?.[0]?.profile?.name;

      const lead = await leadService.getOrCreateLead(
        whatsappAccount.businessId,
        customerPhone,
        customerName,
      );

      console.log("Lead:", lead.id);

      if (!whatsappAccount) {
        console.log("Business:", whatsappAccount?.businessId);

        return res.sendStatus(200);
      }
      const conversation = await conversationService.getOrCreateConversation(
        whatsappAccount.businessId,
        customerPhone,
      );

      await conversationService.saveUserMessage(
        conversation.id,
        customerMessage,
      );

      await conversationService.updateLastMessage(conversation.id);

      const answer = await chatService.ask(
        whatsappAccount.businessId,
        customerPhone,
        customerMessage,
      );

      await conversationService.saveAssistantMessage(
        conversation.id,
        answer ?? "I'm sorry, I couldn't find an answer to your question.",
      ); // TODO: Customize the default message as needed

      await whatsappService.sendTextMessage(
        customerPhone,
        answer ?? "I'm sorry, I couldn't find an answer to your question.", // TODO: Customize the default message as needed
      );

      console.log("AI Answer:", answer);

      return res.sendStatus(200);
    } catch (error) {
      console.error(error);

      return res.sendStatus(500);
    }
  }
}
