"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';


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
                    toast.success('Questions saved successfully!', { position: 'top-center' });
                } else {
                    toast.error('Error saving questions. Please try again.', { position: 'top-center' });
                }

                if (generatedQuestions.length === 0) {
                    setError('No questions generated. Try different input.');
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
        const question = typeof questions[0] === 'string' ? questions[0] : '';
        router.push(`/chat-interface?question=${encodeURIComponent(question)}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <ToastContainer />
            <header className="bg-gray-800 shadow-lg p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">New Analysis</h1>
                    <Link href='/'>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition duration-200">
                            Back
                        </button>
                    </Link>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-1 text-center px-6 md:px-0">
                <h2 className="text-4xl font-extrabold mb-4">Generate Questions from Text</h2>
                <form className="w-full max-w-xl mx-auto bg-gray-900 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <textarea
                        className="w-full h-40 p-4 rounded-lg bg-gray-800 text-white mb-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 rounded-lg ${loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Generate Questions'}
                    </button>
                </form>

                <div className="mt-6 w-full max-w-xl">
                    <h3 className="text-2xl font-bold">Generated Questions:</h3>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {!error && questions.length > 0 ? (
                        <ul className="list-disc list-inside mt-4 text-gray-400">
                            {questions.map((question, index) => (
                                <li key={index} className="mt-2">{question}</li>
                            ))}
                        </ul>
                    ) : !error && !loading && (
                        <p className="text-gray-400 mt-2">Questions will be displayed here after generation.</p>
                    )}

                    {questions.length > 0 && (
                        <button
                            onClick={handlePromptInChat}
                            className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition duration-200"
                        >
                            Prompt in Chat
                        </button>
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
