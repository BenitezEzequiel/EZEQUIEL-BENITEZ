
import React from 'react';

interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ options, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-slate-700">
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveTab(option.id)}
            className={`${
              activeTab === option.id
                ? 'border-teal-400 text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-400'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
          >
            {option.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
