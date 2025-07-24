import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.log('Fetching result with ID:', params.id);
        const result = await prisma.quizResult.findFirst({
            where: {
                id: params.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!result) {
            return NextResponse.json(
                { error: 'Result not found' },
                { status: 404 }
            );
        }

        // Check if the result belongs to the requesting user
        if (result.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching saved result:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
