// Implement knowledge base services here
import { prisma } from "../../config/prisma";

export class KnowledgeBaseService {
  async create(
    businessId: string,
    payload: {
      title: string;
      content: string;
      category?: string;
      tags?: string[];
    }
  ) {
    return prisma.knowledgeBase.create({
      data: {
        businessId,
        ...payload,
      },
    });
  }

  async getAll(
    businessId: string
  ) {
    return prisma.knowledgeBase.findMany({
      where: {
        businessId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(
    id: string,
    businessId: string
  ) {
    return prisma.knowledgeBase.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}