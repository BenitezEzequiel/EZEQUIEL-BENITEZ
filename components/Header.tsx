
import React from 'react';
import { AutomationIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-slate-700 pb-6">
      <div className="flex items-center justify-center gap-4 mb-2">
        <AutomationIcon className="w-10 h-10 text-teal-400" />
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Testing Automation Assistant
        </h1>
      </div>
      <p className="text-lg text-slate-400 max-w-3xl mx-auto">
        Your AI partner for the "Tp Final Testing II 2025" project. Describe a test scenario, and get Python scripts, test cases, and bug reports instantly.
      </p>
    </header>
  );
};
