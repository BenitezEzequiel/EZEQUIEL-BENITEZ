
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-lg relative group">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-slate-700 rounded-md text-slate-300 hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <pre className="p-4 overflow-x-auto text-sm text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};
