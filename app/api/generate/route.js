import axios from 'axios';

export async function POST(request) {
  const { inputs } = await request.json();
  const hfApiKey = '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'; // Replace with your Hugging Face API key

  if (!inputs) {
    return new Response(JSON.stringify({ error: 'No inputs provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/ZhangCheng/T5-Base-finetuned-for-Question-Generation',
      { inputs: `generate questions: ${inputs}` },
      {
        headers: {
          Authorization: `Bearer ${hfApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Parse the response to extract generated questions
    if (response.data && Array.isArray(response.data)) {
      const questions = response.data.map((item) => item.generated_text).filter(Boolean);
      return new Response(JSON.stringify({ questions }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Unexpected response format from Hugging Face API');
    }
  } catch (error) {
    console.error('Error communicating with Hugging Face:', error.response ? error.response.data : error.message);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate questions',
        details: error.response ? error.response.data : error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
