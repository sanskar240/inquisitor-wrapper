import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export async function POST(req) {
    try {
        const { questions } = await req.json();
        console.log('POST request received with questions:', questions);

        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Invalid questions array' }),
                { status: 400 }
            );
        }

        const savedQuestions = await prisma.question.createMany({
            data: questions.map((q) => ({ text: q })),
        });

        return new Response(
            JSON.stringify({
                message: 'Questions saved successfully',
                savedQuestions,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in POST /api/questions:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to save questions', details: error.message }),
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        console.log('GET request received');
        const questions = await prisma.question.findMany();

        return new Response(JSON.stringify({ questions }), { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/questions:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch questions', details: error.message }),
            { status: 500 }
        );
    }
}
