// Business controller
import { Request, Response } from "express";
import { BusinessService } from "./business.service";
import { createBusinessSchema } from "./business.schema";

const service = new BusinessService();

export class BusinessController {
  async create(req: Request, res: Response) {
    const payload = createBusinessSchema.parse(req.body);

    const business = await service.create(payload);

    return res.status(201).json({
      success: true,
      data: business,
    });
  }
}