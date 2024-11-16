import axios from 'axios';

export async function POST(req) {
    const { message } = await req.json();

    if (!message) {
        return new Response(JSON.stringify({ error: 'Message is required.' }), { status: 400 });
    }

    // Updated API endpoint for BlenderBot
    const apiEndpoint = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
    
    const headers = {
        Authorization: `Bearer hf_YOUR_API_KEY`,  // Replace with your own Hugging Face API key
        'Content-Type': 'application/json',
    };

    const fetchModelResponse = async () => {
        try {
            const response = await axios.post(apiEndpoint, { inputs: message }, { headers });
            if (response.data && response.data[0]?.generated_text) {
                return response.data[0].generated_text;
            } else {
                throw new Error('No response text received from model.');
            }
        } catch (error) {
            console.error('Error in model API request:', error.message);
            throw new Error('Failed to retrieve model response.');
        }
    };

    try {
        const assistantMessage = await fetchModelResponse();
        return new Response(JSON.stringify({ message: assistantMessage }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Service is currently unavailable. Please try again later.' }), { status: 500 });
    }
}

