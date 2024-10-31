// NewAnalysis component

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NewAnalysis = () => {
    const [text, setText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setQuestions([]);
        setError('');

        if (!text.trim()) {
            setError('Please enter some text to generate questions.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/ZhangCheng/T5-Base-finetuned-for-Question-Generation',
                { inputs: text },
                {
                    headers: {
                        Authorization: `Bearer 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`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data && Array.isArray(response.data)) {
                const generatedQuestions = response.data.map((item) => item.generated_text).filter(Boolean);
                setQuestions(generatedQuestions);

                const saveResponse = await axios.post('/api/questions', { questions: generatedQuestions });
                if (saveResponse.status === 200) {
                    console.log('Questions saved successfully:', saveResponse.data);
                } else {
                    setError('Error saving questions. Please try again.');
                }

                if (generatedQuestions.length === 0) {
                    setError('No questions generated. Please try different input.');
                }
            } else {
                setError('Unexpected response format from the API.');
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                setError('Invalid or missing API token for Hugging Face.');
            } else {
                setError('Error generating questions. Please try again later.');
            }
            console.error('Error details:', err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePromptInChat = () => {
        // Ensure that question is passed as a valid string in the URL
        const question = typeof questions[0] === 'string' ? questions[0] : '';
        router.push(`/chat-interface?question=${encodeURIComponent(question)}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">New Analysis</h1>
                    <Link href='/'>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Back
                        </button>
                    </Link>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-1 text-center px-4 md:px-0">
                <h2 className="text-3xl font-bold mb-2">Enter Text for Prompt Generation</h2>
                <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-32 p-2 rounded bg-gray-800 text-white mb-4"
                        placeholder="Paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded ${loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Questions'}
                    </button>
                </form>

                <div className="mt-4 w-full max-w-lg">
                    <h3 className="text-xl font-bold">Generated Questions:</h3>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {!error && questions.length > 0 ? (
                        <>
                            {questions.map((question, index) => (
                                <p key={index} className="text-gray-400 mt-2">{question}</p>
                            ))}

                            {/* Button to redirect to Chat Interface */}
                            <button
                                onClick={handlePromptInChat}
                                className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                                Prompt in Chat
                            </button>
                        </>
                    ) : !error && !loading && (
                        <p className="text-gray-400 mt-2">Questions will be displayed here after generation.</p>
                    )}
                </div>
            </main>

            <footer className="bg-gray-800 text-center p-4">
                <p className="text-sm text-gray-400">© 2024 My Company</p>
            </footer>
        </div>
    );
};

export default NewAnalysis;
