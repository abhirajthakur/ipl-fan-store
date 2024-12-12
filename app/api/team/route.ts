import { auth } from "@/auth";
import prisma from "@/db";
import { getTeamById } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teamId } = await request.json();
    const team = getTeamById(teamId);

    if (!team) {
      return NextResponse.json({ error: "Invalid team ID" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId },
    });

    return NextResponse.json({
      user: {
        ...user,
        team,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
