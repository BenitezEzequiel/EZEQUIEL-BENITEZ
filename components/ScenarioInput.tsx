
import React from 'react';
import { GenerateIcon, LoadingIcon } from './icons';

interface ScenarioInputProps {
  scenario: string;
  setScenario: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ScenarioInput: React.FC<ScenarioInputProps> = ({ scenario, setScenario, onGenerate, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-white mb-4">1. Describe Your Test Scenario</h2>
      <p className="text-slate-400 mb-4">
        Enter a plain English description of the user actions you want to automate. For example: "Go to wikipedia.org, search for 'Python programming', and verify the title of the resulting page."
      </p>
      <textarea
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        placeholder="e.g., Log in to a website with username 'testuser' and password 'password123'..."
        className="w-full flex-grow p-4 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none transition-shadow resize-none text-slate-200"
        rows={12}
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !scenario.trim()}
        className="mt-6 w-full flex items-center justify-center gap-3 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
      >
        {isLoading ? (
          <>
            <LoadingIcon className="animate-spin h-5 w-5" />
            Generating Assets...
          </>
        ) : (
          <>
            <GenerateIcon className="h-5 w-5" />
            Generate Test Assets
          </>
        )}
      </button>
    </div>
  );
};
