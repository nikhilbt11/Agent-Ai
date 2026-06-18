import { Request, Response } from "express";
import { LeadService } from "./lead.service";

const leadService = new LeadService();

export class LeadController {
  async getLeads(
    req: Request,
    res: Response,
  ) {
    const leads =
      await leadService.getLeads(
        req.user!.businessId,
      );

    return res.json({
      success: true,
      data: leads,
    });
  }

  async updateStatus(
    req: Request,
    res: Response,
  ) {
    const { id } = req.params;

    const { status } = req.body;

    const lead =
      await leadService.updateStatus(
        id as string,
        status,
      );

    return res.json({
      success: true,
      data: lead,
    });
  }
}