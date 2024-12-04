import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { assignRandomTeam } from "@/lib/utils";
import prisma from "@/db";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedTeam = assignRandomTeam();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        teamId: assignedTeam.id,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        team: assignedTeam,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
