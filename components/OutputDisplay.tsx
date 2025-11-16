
import React, { useState } from 'react';
import { GeneratedAssets } from '../types';
import { CodeBlock } from './CodeBlock';
import { Tabs } from './Tabs';
import { TestCaseCard } from './TestCaseCard';
import { BugReportCard } from './BugReportCard';
import { LoadingIcon, ErrorIcon, BulbIcon } from './icons';

interface OutputDisplayProps {
  assets: GeneratedAssets | null;
  isLoading: boolean;
  error: string | null;
}

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <BulbIcon className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold">Your generated assets will appear here.</h3>
        <p>Describe a scenario and click "Generate" to get started.</p>
    </div>
);


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ assets, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState('python');

  const tabOptions = [
    { id: 'python', label: 'Python Script' },
    { id: 'testCases', label: 'Test Cases' },
    { id: 'bugReport', label: 'Bug Report' },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <LoadingIcon className="w-12 h-12 animate-spin mb-4" />
          <p className="text-lg">Generating your testing assets...</p>
          <p className="text-sm">This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
          <ErrorIcon className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-bold">An Error Occurred</h3>
          <p className="text-center mt-2">{error}</p>
        </div>
      );
    }
    
    if (!assets) {
      return <Placeholder />;
    }

    switch (activeTab) {
      case 'python':
        return <CodeBlock code={assets.pythonScript} />;
      case 'testCases':
        return (
          <div className="space-y-4 p-1">
            {assets.testCases.map((tc) => <TestCaseCard key={tc.id} testCase={tc} />)}
          </div>
        );
      case 'bugReport':
        return <BugReportCard report={assets.bugReport} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 min-h-[500px] flex flex-col">
      <div className="flex-shrink-0">
        <h2 className="text-2xl font-semibold text-white mb-4">2. Generated Assets</h2>
        {assets && !isLoading && !error && <Tabs options={tabOptions} activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>
      <div className="mt-4 flex-grow bg-slate-900 rounded-md overflow-y-auto p-4 border border-slate-700/50">
        {renderContent()}
      </div>
    </div>
  );
};


const TestCaseCard: React.FC<{ testCase: GeneratedAssets['testCases'][0] }> = ({ testCase }) => {
    const isPositive = testCase.type === 'Positive';
    return (
        <div className={`border-l-4 ${isPositive ? 'border-green-500' : 'border-red-500'} bg-slate-800 p-4 rounded-r-md`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {testCase.type}
                    </span>
                    <h4 className="font-bold text-lg mt-2 text-slate-100">{testCase.description}</h4>
                </div>
                <span className="text-slate-500 font-mono text-sm">ID: {testCase.id}</span>
            </div>
            <div className="mt-4 text-slate-300 text-sm space-y-3">
                <div>
                    <h5 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Steps:</h5>
                    <p className="whitespace-pre-wrap">{testCase.steps}</p>
                </div>
                <div>
                    <h5 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Expected Result:</h5>
                    <p className="whitespace-pre-wrap">{testCase.expectedResult}</p>
                </div>
            </div>
        </div>
    );
};

const BugReportCard: React.FC<{ report: GeneratedAssets['bugReport'] }> = ({ report }) => {
    return (
        <div className="bg-slate-800 p-4 rounded-md text-slate-300 text-sm space-y-4">
            <div>
                <h5 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Title:</h5>
                <p className="font-bold text-lg text-slate-100">{report.title}</p>
            </div>
            <div>
                <h5 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Environment:</h5>
                <p className="whitespace-pre-wrap font-mono">{report.environment}</p>
            </div>
            <div>
                <h5 className="font-semibold text-slate-400 uppercase tracking-wider text-xs">Steps to Reproduce:</h5>
                <p className="whitespace-pre-wrap">{report.stepsToReproduce}</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-900/30 p-3 rounded">
                    <h5 className="font-semibold text-red-400 uppercase tracking-wider text-xs">Actual Result:</h5>
                    <p className="whitespace-pre-wrap">{report.actualResult}</p>
                </div>
                <div className="bg-green-900/30 p-3 rounded">
                    <h5 className="font-semibold text-green-400 uppercase tracking-wider text-xs">Expected Result:</h5>
                    <p className="whitespace-pre-wrap">{report.expectedResult}</p>
                </div>
            </div>
        </div>
    );
};
