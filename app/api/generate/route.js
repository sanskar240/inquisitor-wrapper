// app/api/generate/route.js
import axios from 'axios';

export async function POST(request) {
  const { inputs } = await request.json();
  const token = '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';

  try {
    const response = await axios.post(
      'https://huggingface.co/nvidia/Llama-3.1-Nemotron-70B-Instruct-HF',
      { inputs },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error communicating with Hugging Face:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate questions' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
