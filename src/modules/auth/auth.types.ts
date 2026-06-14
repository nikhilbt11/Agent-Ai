export type AuthPayload = {
  name?: string;
  email: string;
  password: string;
};

export type AuthResult = {
  success: boolean;
  user?: any;
  token?: string | null;
};
