import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

export const register = async (req: Request, res: Response) => {
  const result = await service.register(req.body);
  res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const result = await service.login(req.body);
  res.json(result);
};
