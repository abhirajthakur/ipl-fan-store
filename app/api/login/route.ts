import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/db';
import {IPL_TEAMS} from '@/lib/constants';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }

        const team = IPL_TEAMS.find(t => t.id === user.teamId);

        const token = jwt.sign(
            {userId: user.id},
            JWT_SECRET,
            {expiresIn: '24h'}
        );

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                team,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                {error: error.message},
                {status: 500}
            );
        }
        return NextResponse.json(
            {error: 'Internal Server Error'},
            {status: 500}
        );
    }
}