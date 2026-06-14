// Implement knowledge base controllers here
import { Request, Response } from "express";
import { KnowledgeBaseService } from "./knowledge-base.service";
import { createKnowledgeBaseSchema } from "./knowledge-base.schema";

const knowledgeBaseService = new KnowledgeBaseService();

export class KnowledgeBaseController {
  async create(req: Request, res: Response) {
    const payload = createKnowledgeBaseSchema.parse(req.body);

    const result = await knowledgeBaseService.create(
      req.user!.businessId,
      payload,
    );

    return res.status(201).json({
      success: true,
      data: result,
    });
  }

  async getAll(req: Request, res: Response) {
    const result = await knowledgeBaseService.getAll(req.user!.businessId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  async delete(req: Request, res: Response) {
    const result = await knowledgeBaseService.delete(
      req.params.id as string,
      req.user!.businessId,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
}
