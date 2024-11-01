// app/api/questions/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const { questions } = await req.json();

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        return new Response(JSON.stringify({ error: 'Invalid questions array' }), { status: 400 });
    }

    try {
        const savedQuestions = await prisma.question.createMany({
            data: questions.map(q => ({ text: q })),
        });

        return new Response(JSON.stringify({ message: 'Questions saved successfully', savedQuestions }), { status: 200 });
    } catch (error) {
        console.error('Error saving questions:', error);
        return new Response(JSON.stringify({ error: 'Error saving questions', details: error.message }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        const questions = await prisma.question.findMany();
        return new Response(JSON.stringify({ questions }), { status: 200 });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return new Response(JSON.stringify({ error: 'Error fetching questions', details: error.message }), { status: 500 });
    }
}