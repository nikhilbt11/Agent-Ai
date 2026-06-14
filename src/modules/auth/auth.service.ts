import { AuthPayload, AuthResult } from './auth.types';

export class AuthService {
  async register(payload: AuthPayload): Promise<AuthResult> {
    return { success: true, user: null } as AuthResult;
  }

  async login(payload: AuthPayload): Promise<AuthResult> {
    return { success: true, token: null } as AuthResult;
  }
}
