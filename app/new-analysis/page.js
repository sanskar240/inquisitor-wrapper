"use client"; // Ensure this is at the top of the file
import React, { useState } from 'react';
import axios from 'axios';

const NewAnalysis = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState([]); // Store generated questions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!text.trim()) {
      setError('Please enter some text to generate questions.');
      setLoading(false);
      return;
    }

    const prompt = `generate questions: ${text}`; // Prepare the prompt for question generation

    const fetchQuestions = async (attempt = 1) => {
      try {
        const response = await axios.post('http://localhost:3000/api/generate', { inputs: prompt });

        if (Array.isArray(response.data)) {
          setQuestions(response.data); // Assuming response.data is an array of generated questions
        } else {
          setError('Unexpected response format from the API');
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.details && err.response.data.details.error.includes("loading") && attempt < 5) {
          // Wait for a while before retrying
          setTimeout(() => fetchQuestions(attempt + 1), 20000); // Retry after 20 seconds
        } else {
          setError('Error generating questions. Please try again.');
          console.error('Error details:', err.response ? err.response.data : err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions(); // Start fetching questions
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">New Analysis</h1>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-2">Enter Text for Question Generation</h2>
        <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-2 rounded bg-gray-800 text-white mb-4"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Questions'}
          </button>
        </form>

        <div className="mt-4">
          <h3 className="text-xl font-bold">Generated Questions:</h3>
          {error && <p className="text-red-500">{error}</p>}
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <p key={index} className="text-gray-400">{question.translation_text || question}</p> // Adjusted to extract translation_text
            ))
          ) : (
            <p className="text-gray-400">Questions will be displayed here.</p>
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

