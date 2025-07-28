import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const data = await req.json();
        const { results } = data;

        if (!results) {
            return NextResponse.json(
                { error: 'Results data is required' },
                { status: 400 }
            );
        }

        const sessionUserId = session.user.userId || session.user.id;
        console.log('Saving results for user:', sessionUserId);

        const savedResult = await prisma.quizResult.create({
            data: {
                userId: sessionUserId,
                results,
                savedAt: new Date(),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        console.log('Results saved successfully:', savedResult.id);

        return NextResponse.json(savedResult);
    } catch (error) {
        console.error('Error saving quiz results:', error);
        return NextResponse.json(
            { error: 'Failed to save quiz results' },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        console.log('Fetching results for user:', session.user.id);

        const savedResults = await prisma.quizResult.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                savedAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        console.log('Found', savedResults.length, 'results for user');

        return NextResponse.json(savedResults);
    } catch (error) {
        console.error('Error fetching saved results:', error);
        return NextResponse.json(
            { error: 'Failed to fetch saved results' },
            { status: 500 }
        );
    }
}
