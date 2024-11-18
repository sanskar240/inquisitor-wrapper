import React, { useState, useEffect } from 'react';
import { FaBrain, FaLightbulb, FaTools, FaSearch, FaBalanceScale, FaPencilRuler } from 'react-icons/fa';

const generatePrompts = (topic) => ({
  Remember: [`Define ${topic}.`, `List the key points about ${topic}.`],
  Understand: [`Explain the purpose of ${topic}.`, `Summarize the main ideas of ${topic}.`],
  Apply: [`How can ${topic} be applied practically?`, `What are some examples of ${topic}?`],
  Analyze: [`Compare ${topic} with another concept.`, `What are the components of ${topic}?`],
  Evaluate: [`What are the advantages of ${topic}?`, `Critique the effectiveness of ${topic}.`],
  Create: [`Design a new approach to ${topic}.`, `Propose an experiment involving ${topic}.`],
});

const PromptRecommender = ({ userInput, onPromptSelect }) => {
  const [suggestedPrompts, setSuggestedPrompts] = useState({});
  const [expandedLevel, setExpandedLevel] = useState(null);

  useEffect(() => {
    if (userInput) {
      const prompts = generatePrompts(userInput);
      setSuggestedPrompts(prompts);
    } else {
      setSuggestedPrompts({});
    }
  }, [userInput]);

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const iconMap = {
    Remember: <FaBrain />,
    Understand: <FaLightbulb />,
    Apply: <FaTools />,
    Analyze: <FaSearch />,
    Evaluate: <FaBalanceScale />,
    Create: <FaPencilRuler />,
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg mt-4 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">Suggested Prompts by Bloom&apos;s Taxonomy</h3>
      {Object.entries(suggestedPrompts).map(([level, prompts]) => (
        <div key={level} className="mb-3">
          <button
            onClick={() => toggleLevel(level)}
            className="flex items-center justify-between w-full text-left bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 text-white"
          >
            <span className="flex items-center">
              {iconMap[level]} <span className="ml-2 font-medium">{level}</span>
            </span>
            <span>{expandedLevel === level ? '-' : '+'}</span>
          </button>
          {expandedLevel === level && (
            <div className="mt-2 pl-8">
              {prompts.map((prompt, index) => (
                <div key={index} className="text-gray-400 mb-1">
                  <button
                    onClick={() => onPromptSelect(prompt)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                  >
                    {prompt}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PromptRecommender;
