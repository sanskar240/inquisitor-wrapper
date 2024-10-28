import React from 'react';

const GeneratedQuestions = () => {
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
        
        {/* Example Questions */}
        <ul className="list-disc text-left">
          <li className="mb-2">What is the main theme of the text?</li>
          <li className="mb-2">Can you summarize the key points?</li>
          <li className="mb-2">What questions do you have about the content?</li>
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4">
        <p className="text-sm text-gray-400">© 2024 My Company</p>
      </footer>
    </div>
  );
};

export default GeneratedQuestions;
