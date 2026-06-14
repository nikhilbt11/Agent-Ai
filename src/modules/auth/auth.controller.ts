import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import {
  registerSchema,
  loginSchema,
} from "./auth.schema";

const authService = new AuthService();

export class AuthController {
  async register(
    req: Request,
    res: Response
  ) {
    const payload =
      registerSchema.parse(req.body);

    const result =
      await authService.register(payload);

    return res.status(201).json({
      success: true,
      data: result,
    });
  }

  async login(
    req: Request,
    res: Response
  ) {
    const payload =
      loginSchema.parse(req.body);

    const result =
      await authService.login(payload);

    return res.status(200).json({
      success: true,
      data: result,
    });
  }
}