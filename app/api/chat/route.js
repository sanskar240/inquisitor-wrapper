// app/api/chat/route.js

import axios from 'axios';

export async function POST(req) {
    const { message } = await req.json();

    if (!message) {
        return new Response(JSON.stringify({ error: 'Message is required.' }), { status: 400 });
    }

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer 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`, // Replace with your Hugging Face API key
                    'Content-Type': 'application/json',
                },
            }
        );

        const assistantMessage = response.data[0]?.generated_text || "I'm sorry, I couldn't generate a response.";

        return new Response(JSON.stringify({ message: assistantMessage }), { status: 200 });
    } catch (error) {
        console.error('Error fetching from Hugging Face API:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
