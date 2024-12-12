import { auth } from "@/auth";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid product ID or quantity" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedCart = await prisma.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId: session.user.id },
        update: {},
        create: { userId: session.user.id },
      });

      const cartItem = await prisma.cartItem.upsert({
        where: {
          productId: productId,
        },
        update: {
          quantity: {
            increment: quantity,
          },
          cartId: cart.id,
        },
        create: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });

      return await prisma.cart.findUnique({
        where: { id: cart.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });

    return NextResponse.json({ cart: updatedCart });
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
