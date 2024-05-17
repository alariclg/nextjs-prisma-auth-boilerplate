import { getServerSession } from "next-auth";

import userService from "@/services/user.service";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ session: "session" });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !email.includes("@") || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await userService.createUser(email, password);

    return Response.json(user);
  } catch (error) {
    return Response.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
