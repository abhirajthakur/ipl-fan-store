import {NextResponse} from 'next/server';
import {auth} from "@/auth";
import prisma from "@/db";

export async function PATCH(
    request: Request,
    {params}: { params: { itemId: string } }
) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const {quantity} = await request.json();

        const cartItem = await prisma.cartItem.update({
            where: {id: params.itemId},
            data: {quantity},
        });

        const cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return NextResponse.json({cart});
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

export async function DELETE(
    _request: Request,
    {params}: { params: { itemId: string } }
) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        await prisma.cartItem.delete({
            where: {id: params.itemId},
        });

        const cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return NextResponse.json({cart});
    } catch (error) {
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}