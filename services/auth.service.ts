import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { Credentials } from "@/interfaces/credentials.interface";

// Ajouter de l'injection de dépendance pour le service
export class AuthService {
  static _instance: AuthService;

  // Define ApiService as a singleton
  static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }

    return AuthService._instance;
  }

  async authorize({ email, password }: Credentials): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);

    if (
      !user ||
      !user.password ||
      !bcrypt.compareSync(password, user.password)
    ) {
      return null;
    }

    return user;
  }
}

const authService = AuthService.getInstance();

export default authService;
