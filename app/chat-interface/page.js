"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import PromptRecommender from '../(components)/PromptRecommender';

const ChatInterface = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get('question') || '';
  const [input, setInput] = useState(initialQuestion);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPromptRecommender, setShowPromptRecommender] = useState(true); // Add this state to control visibility

  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const assistantMessage = { role: 'assistant', content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (selectedPrompt) => {
    setInput(selectedPrompt);
    handleSend();
  };

  // Optional: Toggle visibility of the prompt recommender (if needed)
  const togglePromptVisibility = () => {
    setShowPromptRecommender(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 text-center text-lg font-semibold">
        Chat with our Assistant
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-700 rounded-lg max-w-xs">Loading...</div>
          </div>
        )}
      </div>

      {/* Show PromptRecommender only when the state allows it */}
      {showPromptRecommender && <PromptRecommender userInput={input} onPromptSelect={handlePromptSelect} />}

      <div className="bg-gray-800 p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
