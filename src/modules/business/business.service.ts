// Business service
import { prisma } from "../../config/prisma";

export class BusinessService {
  async create(data: {
    name: string;
    phoneNumber: string;
    description?: string;
  }) {
    return prisma.business.create({
      data,
    });
  }

  async findByPhone(phoneNumber: string) {
    return prisma.business.findUnique({
      where: {
        phoneNumber,
      },
    });
  }
}