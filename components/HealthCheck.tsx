
import React, { useState, useEffect } from 'react';
import { HealthStatus } from '../types';

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus>(HealthStatus.CHECKING);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // This is a mock. In a real app, you would fetch from your backend.
        // For demonstration, we simulate a successful response.
        // const response = await fetch('/api/health');
        // if (!response.ok) throw new Error('Backend not healthy');
        // const data = await response.json();
        // if (data.status !== 'ok') throw new Error('Status not OK');
        
        // Mocking a successful fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = { status: 'ok' };

        if (mockData.status === 'ok') {
            setStatus(HealthStatus.HEALTHY);
        } else {
            setStatus(HealthStatus.UNHEALTHY);
        }

      } catch (error) {
        console.error('Health check failed:', error);
        setStatus(HealthStatus.UNHEALTHY);
      }
    };

    checkHealth();
  }, []);

  const getStatusIndicator = () => {
    switch (status) {
      case HealthStatus.CHECKING:
        return (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Checking...</span>
          </div>
        );
      case HealthStatus.HEALTHY:
        return (
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>API Status: Healthy</span>
          </div>
        );
      case HealthStatus.UNHEALTHY:
        return (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span>API Status: Unhealthy</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">System Status</h2>
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
        {getStatusIndicator()}
      </div>
    </div>
  );
};

export default HealthCheck;
