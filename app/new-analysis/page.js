"use client";
import React, { useState } from 'react';
import axios from 'axios';

const NewAnalysis = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState([]);
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

    const prompt = `generate questions: ${text}`;

    try {
      // Update the endpoint to match the new route path `/api/generate`
      const response = await axios.post('http://localhost:3000/api/generate', { inputs: prompt });


      if (response.data) {
        setQuestions(response.data || []); // Update based on response structure
      } else {
        setError('Unexpected response format from the API');
      }
    } catch (err) {
      setError('Error generating questions. Please try again.');
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
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
              <p key={index} className="text-gray-400">{question}</p>
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
