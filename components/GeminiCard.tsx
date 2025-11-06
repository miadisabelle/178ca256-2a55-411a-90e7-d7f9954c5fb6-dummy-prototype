
import React, { useState, useCallback } from 'react';
import { generateGeminiResponse } from '../services/geminiService';

const GeminiCard: React.FC = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendPrompt = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResponse('');
    try {
      const result = await generateGeminiResponse('Tell me a fun fact about the React framework.');
      setResponse(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to get response from Gemini. ${err.message}. Ensure your API key is configured correctly.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Gemini API Integration</h2>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Click the button below to send a sample prompt to the Gemini API and see the response.
        </p>
        <button
          onClick={handleSendPrompt}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            'Send Test Prompt'
          )}
        </button>
        
        {error && (
            <div className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}

        {response && (
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Gemini's Response:</h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response}</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default GeminiCard;
