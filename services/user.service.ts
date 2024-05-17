import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

// Ajouter de l'injection de dépendance pour le service
export class UserService {
  static _instance: UserService;

  // Define ApiService as a singleton
  static getInstance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }

    return UserService._instance;
  }

  // Ajouter un service d'erreur
  async createUser(email: string, password: string): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return this.serializeUser(newUser);
  }

  async serializeUser(user: User): Promise<User> {
    if (user.password) user.password = null;

    return user;
  }
}

const userService = UserService.getInstance();

export default userService;
