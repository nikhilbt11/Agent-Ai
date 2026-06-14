// Implement conversation controllers here
import { Request, Response } from "express";
import { ConversationService } from "./conversation.service";

const conversationService =
  new ConversationService();

export class ConversationController {
  async getConversations(
    req: Request,
    res: Response
  ) {
    const data =
      await conversationService.getConversations(
        req.user!.businessId
      );

    return res.json({
      success: true,
      data,
    });
  }

  async getMessages(
    req: Request,
    res: Response
  ) {
    const data =
      await conversationService.getMessages(
        req.params.id as string
      );

    return res.json({
      success: true,
      data,
    });
  }
}