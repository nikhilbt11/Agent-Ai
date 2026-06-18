import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

const dashboardService =
  new DashboardService();

export class DashboardController {
  async getStats(
    req: Request,
    res: Response,
  ) {
    const data =
      await dashboardService.getStats(
        req.user!.businessId,
      );

    return res.json({
      success: true,
      data,
    });
  }

  async getRecentLeads(
  req: Request,
  res: Response,
) {
  const data =
    await dashboardService.getRecentLeads(
      req.user!.businessId,
    );

  return res.json({
    success: true,
    data,
  });
}

async getRecentConversations(
  req: Request,
  res: Response,
) {
  const data =
    await dashboardService.getRecentConversations(
      req.user!.businessId,
    );

  return res.json({
    success: true,
    data,
  });
}
}