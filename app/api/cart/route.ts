import {NextResponse} from 'next/server';
import {auth} from "@/auth";
import prisma from "@/db";

export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const cart = await prisma.cart.findFirst({
            where: {userId: session.user.id},
        });

        return NextResponse.json({cart});
    } catch (error) {
        console.error('Cart GET error:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        const [session] = await Promise.all([auth()]);

        if (!session) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const body = await request.json();
        const {productId, quantity} = body;

        if (!productId || typeof quantity !== 'number' || quantity < 1) {
            return NextResponse.json(
                {error: 'Invalid product ID or quantity'},
                {status: 400}
            );
        }

        // Verify product exists
        const product = await prisma.product.findUnique({
            where: {id: productId}
        });
        console.log(product);

        if (!product) {
            return NextResponse.json(
                {error: 'Product not found'},
                {status: 404}
            );
        }


        // let cart = await prisma.cart.findFirst({
        //     where: {userId: session.user.id}
        // });
        //
        // if (!cart) {
        //     cart = await prisma.cart.create({
        //         data: {userId: session.user.id}
        //     });
        // }
        //
        // const existingItem = await prisma.cartItem.findFirst({
        //     where: {
        //         cartId: cart.id,
        //         productId: productId
        //     }
        // });
        //
        // if (existingItem) {
        //     await prisma.cartItem.update({
        //         where: {id: existingItem.id},
        //         data: {quantity: existingItem.quantity + quantity}
        //     });
        // } else {
        //     await prisma.cartItem.create({
        //         data: {
        //             cartId: cart.id,
        //             productId: productId,
        //             quantity: quantity
        //         }
        //     });
        // }
        //
        // const updatedCart = await prisma.cart.findFirst({
        //     where: {id: cart.id},
        //     include: {
        //         items: {
        //             include: {
        //                 product: true
        //             }
        //         }
        //     }
        // });

        // return NextResponse.json({cart: updatedCart});
    } catch (error) {
        console.error('Cart POST error:', error);
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}