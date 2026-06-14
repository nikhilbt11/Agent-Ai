import { prisma } from "../../config/prisma";
import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/password";

import type { RegisterDto, LoginDto } from "./auth.schema";

export class AuthService {
  async register(payload: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(payload.password);

    const business = await prisma.business.create({
      data: {
        name: payload.businessName,
        email: payload.businessEmail,
        phoneNumber: payload.businessPhone,
      },
    });

    const user = await prisma.user.create({
      data: {
        businessId: business.id,
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: "OWNER",
      },
    });

    const token = generateToken(user.id, business.id);

    const { password, ...safeUser } = user;

    return {
      token,
      user: safeUser,
      business,
    };
  }

  async login(payload: LoginDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id, user.businessId);

    const { password, ...safeUser } = user;

    return {
      token,
      user: safeUser,
    };
  }
}
