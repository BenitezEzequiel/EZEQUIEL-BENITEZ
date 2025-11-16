
import React, { useState, useCallback } from 'react';
import { ScenarioInput } from './components/ScenarioInput';
import { OutputDisplay } from './components/OutputDisplay';
import { Header } from './components/Header';
import { generateTestAssets } from './services/geminiService';
import { GeneratedAssets } from './types';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<string>('');
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAssets | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!scenario.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedAssets(null);

    try {
      const result = await generateTestAssets(scenario);
      setGeneratedAssets(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? `Failed to generate assets: ${err.message}. Please check your connection and API key.` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [scenario, isLoading]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ScenarioInput
            scenario={scenario}
            setScenario={setScenario}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputDisplay
            assets={generatedAssets}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
