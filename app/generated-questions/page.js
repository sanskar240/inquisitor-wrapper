"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeneratedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions'); // Update with your API endpoint
        setQuestions(response.data.questions || []);
      } catch (err) {
        setError('Error fetching questions. Please try again.');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Generated Questions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 md:px-0">
        <h2 className="text-3xl font-bold mb-2">Your Questions</h2>
        {/* Placeholder for displaying generated questions */}
        <p className="text-lg mb-4">Here are the questions generated from your analysis:</p>

        {loading ? (
          <p className="text-gray-400">Loading questions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : questions.length > 0 ? (
          <ul className="list-disc text-left">
            {questions.map((question, index) => (
              <li key={index} className="mb-2">{question.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No questions generated yet.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4">
        <p className="text-sm text-gray-400">© 2024 My Company</p>
      </footer>
    </div>
  );
};

export default GeneratedQuestions;
