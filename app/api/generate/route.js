import axios from 'axios';

export async function POST(request) {
  const { inputs } = await request.json();
  const token = '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'; // Keep this token secure

  // Check if inputs are provided
  if (!inputs) {
    return new Response(JSON.stringify({ error: 'No inputs provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/t5-small', // Updated endpoint
      { inputs: `generate questions: ${inputs}` }, // Ensure the prompt is set for question generation
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the response data is in the expected format
    if (response.data && Array.isArray(response.data)) {
      // Extract generated questions from response
      const questions = response.data.map(item => item.generated_text || item.text || item); // Adjust based on actual response structure
      return new Response(JSON.stringify(questions), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error communicating with Hugging Face:', error.response ? error.response.data : error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to generate questions', details: error.response ? error.response.data : error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
