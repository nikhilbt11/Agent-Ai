import { prisma } from "../../config/prisma";

export class LeadService {
  async getOrCreateLead(
    businessId: string,
    phone: string,
    name?: string,
  ) {
    let lead = await prisma.lead.findFirst({
      where: {
        businessId,
        phone,
      },
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          businessId,
          phone,
          name,
        },
      });
    }

    return lead;
  }

  async getLeads(
    businessId: string,
  ) {
    return prisma.lead.findMany({
      where: {
        businessId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateStatus(
    leadId: string,
    status:
      | "NEW"
      | "CONTACTED"
      | "QUALIFIED"
      | "CONVERTED"
      | "LOST",
  ) {
    return prisma.lead.update({
      where: {
        id: leadId,
      },
      data: {
        status,
      },
    });
  }
}