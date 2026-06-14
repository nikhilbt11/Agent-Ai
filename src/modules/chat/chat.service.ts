import { prisma } from "../../config/prisma";
import { GeminiService } from "../../services/gemini.service";
import { ConversationService } from "./conversation.service";

const geminiService = new GeminiService();
const conversationService = new ConversationService();

export class ChatService {
  async ask(businessId: string, customerPhone: string, question: string) {
    const conversation = await conversationService.getOrCreateConversation(
      businessId,
      customerPhone,
    );

    await conversationService.saveUserMessage(conversation.id, question);

    const history = await conversationService.getRecentMessages(
      conversation.id,
    );

    const historyText = history
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const knowledge = await prisma.knowledgeBase.findMany({
      where: {
        businessId,
        isActive: true,
      },
    });

    const context = knowledge
      .map(
        (item) =>
          `Title: ${item.title}


Content: ${item.content}`,
      )
      .join("\n\n");

    const prompt = `


You are an AI assistant for this business.

Rules:

1. Answer ONLY from the knowledge base.
2. Do NOT invent information.
3. Do NOT use outside knowledge.
4. Use chat history for context.
5. Keep answers under 100 words.
6. Be professional and friendly.
7. If the answer cannot be found in the knowledge base, reply exactly:
   "I don't have information about that."

Knowledge Base:

${context}

Chat History:

${historyText}

Customer Question:

${question}
`;

    const answer = await geminiService.generateResponse(prompt);

    await conversationService.saveAssistantMessage(conversation.id, answer ?? "");

    return answer;
  }
}
