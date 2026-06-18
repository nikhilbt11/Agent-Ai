import { prisma } from "../../config/prisma";

export class DashboardService {
  async getStats(businessId: string) {
    const [
      totalLeads,
      newLeads,
      convertedLeads,
      totalConversations,
      totalMessages,
    ] = await Promise.all([
      prisma.lead.count({
        where: {
          businessId,
        },
      }),

      prisma.lead.count({
        where: {
          businessId,
          status: "NEW",
        },
      }),

      prisma.lead.count({
        where: {
          businessId,
          status: "CONVERTED",
        },
      }),

      prisma.conversation.count({
        where: {
          businessId,
        },
      }),

      prisma.message.count({
        where: {
          conversation: {
            businessId,
          },
        },
      }),
    ]);

    return {
      totalLeads,
      newLeads,
      convertedLeads,
      totalConversations,
      totalMessages,
    };
  }

  async getRecentLeads(
  businessId: string,
) {
  return prisma.lead.findMany({
    where: {
      businessId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

async getRecentConversations(
  businessId: string,
) {
  return prisma.conversation.findMany({
    where: {
      businessId,
    },
    orderBy: {
      lastMessageAt: "desc",
    },
    take: 5,
  });
}
}