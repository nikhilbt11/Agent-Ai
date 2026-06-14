// Chat controller
import { Request, Response } from "express";

import { chatSchema } from "./chat.schema";
import { ChatService } from "./chat.service";

const chatService = new ChatService();

export class ChatController {
  async ask(req: Request, res: Response) {
    const { customerPhone, message } = chatSchema.parse(req.body);

    const answer = await chatService.ask(
      req.user!.businessId,
      customerPhone,
      message,
    );

    return res.json({
      success: true,
      answer,
    });
  }
}
