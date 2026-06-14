// Implement conversation services here
import { prisma } from "../../config/prisma";

export class ConversationService {
  async getOrCreateConversation(businessId: string, customerPhone: string) {
    let conversation = await prisma.conversation.findFirst({
      where: {
        businessId,
        customerPhone,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          businessId,
          customerPhone,
          lastMessageAt: new Date(),
        },
      });
    }

    return conversation;
  }

  async saveUserMessage(conversationId: string, content: string) {
    return prisma.message.create({
      data: {
        conversationId,
        role: "USER",
        content,
      },
    });
  }

  async saveAssistantMessage(conversationId: string, content: string) {
    return prisma.message.create({
      data: {
        conversationId,
        role: "ASSISTANT",
        content,
      },
    });
  }

  async getRecentMessages(conversationId: string) {
    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 10,
    });
  }

  async getConversations(businessId: string) {
    return prisma.conversation.findMany({
      where: {
        businessId,
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });
  }

  async getMessages(conversationId: string) {
    return prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
