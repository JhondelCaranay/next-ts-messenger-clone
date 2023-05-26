import { prisma } from "@/app/libs/db";
import bcrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // return new NextResponse("All fields are required", { status: 400 });

  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error, "REGISTRATION ERROR");
    return new NextResponse(error.message, { status: 500 });
  }
}
