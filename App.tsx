
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HealthCheck from './components/HealthCheck';
import GeminiCard from './components/GeminiCard';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Dummy Prototype
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A demonstration of a modern, production-ready web application.
            </p>
          </div>

          <div className="space-y-8">
            <HealthCheck />
            <GeminiCard />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} Dummy Prototype. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
