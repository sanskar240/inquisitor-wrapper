import React, { useState, useEffect } from 'react';

const generatePrompts = (topic) => {
  const templates = [
    `What are the fundamental concepts of ${topic}?`,
    `How can ${topic} be applied in real life?`,
    `What are some recent studies on ${topic}?`,
    `What are the latest trends in ${topic}?`,
  ];
  return templates;
};

const PromptRecommender = ({ userInput, onPromptSelect }) => {
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (userInput) {
      const prompts = generatePrompts(userInput);
      setSuggestedPrompts(prompts);
    } else {
      setSuggestedPrompts([]);
    }
  }, [userInput]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <button 
        onClick={toggleVisibility} 
        className="mb-2 text-blue-400 hover:underline"
      >
        {isVisible ? 'Hide' : 'Show'} Suggested Prompts
      </button>
      {isVisible && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Suggested Prompts:</h3>
          <ul className="list-disc list-inside space-y-1">
            {suggestedPrompts.map((prompt, index) => (
              <li key={index} className="text-gray-300">
                <a 
                  href="#"
                  onClick={() => onPromptSelect(prompt)}
                  className="text-blue-400 hover:underline"
                >
                  {prompt}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PromptRecommender;
