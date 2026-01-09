import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Copy, Trash2, AlertCircle } from 'lucide-react';
import { ToolDefinition } from '../types';
import { clsx } from 'clsx';
import { SEOHead } from './SEOHead';
import { SEOContent } from './SEOContent';
import { TOOL_SEO } from '../config/toolSEO';
import { TOOLS } from '../config/tools';

interface ToolShellProps {
  tool: ToolDefinition;
}

export const ToolShell: React.FC<ToolShellProps> = ({ tool }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const seoData = TOOL_SEO[tool.id];
  
  // Initialize state from URL or defaults
  const [input, setInput] = useState(() => searchParams.get('input') || '');
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const opts: Record<string, any> = {};
    tool.options?.forEach(opt => {
      const urlVal = searchParams.get(opt.key);
      if (opt.type === 'boolean') {
        opts[opt.key] = urlVal === 'true' ? true : urlVal === 'false' ? false : opt.defaultValue;
      } else {
        opts[opt.key] = urlVal || opt.defaultValue;
      }
    });
    return opts;
  });

  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  
  const relatedTools = seoData?.relatedToolIds
    ?.map(id => TOOLS.find(t => t.id === id))
    .filter(Boolean)
    .map(t => ({ path: t!.path, title: t!.title })) || [];

  const structuredData = seoData ? {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description: seoData.metaDescription,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    url: canonicalUrl
  } : undefined;

  // Sync state to URL (debounced for input)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params: Record<string, string> = {};
      if (input) params.input = input;
      Object.entries(options).forEach(([k, v]) => {
        if (v !== undefined) params[k] = String(v);
      });
      setSearchParams(params, { replace: true });
    }, 500);
    return () => clearTimeout(timer);
  }, [input, options, setSearchParams]);

  // Reactive Transformation
  useEffect(() => {
    try {
      if (!input && !tool.transform.length) {
         // Handle cases where transform might not need input, though rare in this set
         setOutput(''); 
         setError(null);
         return;
      }
      const result = tool.transform(input, options);
      setOutput(result);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Transformation failed');
    }
  }, [input, options, tool]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setSearchParams({});
  };

  const primaryKeyword = seoData?.primaryKeyword || tool.title.toLowerCase();
  const pageTitle = `${primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)} – Free Online Tool`;
  const metaDescription = seoData?.metaDescription || `${tool.description} Runs 100% in your browser. No data leaves your device.`;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        keywords={[primaryKeyword, tool.category.toLowerCase(), 'developer tools', 'online tool', 'free tool']}
        structuredData={structuredData}
      />
      <main className="flex flex-col overflow-y-auto">
        <header className="px-8 py-6 border-b border-slate-200 dark:border-gray-800 shrink-0">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <tool.icon className="w-6 h-6 text-blue-500" />
            {primaryKeyword.charAt(0).toUpperCase() + primaryKeyword.slice(1)}
          </h1>
          {seoData?.whatItDoes && (
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              {seoData.whatItDoes}
            </p>
          )}
          {!seoData?.whatItDoes && (
            <p className="text-slate-500 dark:text-gray-400">{tool.description}</p>
          )}
        </header>

        <section aria-label="Tool options" className="shrink-0">
          {tool.options && tool.options.length > 0 && (
            <div className="px-8 py-4 border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 flex flex-wrap gap-6 transition-colors">
          {tool.options.map(opt => (
            <div key={opt.key} className={clsx(
              "flex gap-3",
              opt.display === 'buttons' ? "flex-col items-start xl:flex-row xl:items-center" : "items-center"
            )}>
              <label className="text-sm font-medium text-slate-600 dark:text-gray-300 shrink-0">{opt.label}</label>
              {opt.type === 'select' ? (
                opt.display === 'buttons' ? (
                  <div className="flex flex-wrap gap-2">
                    {opt.options?.map(o => (
                      <button
                        key={o.value}
                        onClick={() => setOptions(prev => ({ ...prev, [opt.key]: o.value }))}
                        className={clsx(
                          "px-3 py-1.5 text-sm font-medium rounded-md border transition-all",
                          options[opt.key] === o.value
                            ? "bg-blue-100 dark:bg-blue-500/20 border-blue-400 dark:border-blue-500/50 text-blue-700 dark:text-blue-400"
                            : "bg-white dark:bg-gray-950 border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-gray-700 hover:text-slate-900 dark:hover:text-gray-200"
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <select
                    value={options[opt.key]}
                    onChange={(e) => setOptions(prev => ({ ...prev, [opt.key]: e.target.value }))}
                    className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-gray-200 text-sm rounded-md px-3 py-1.5 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    {opt.options?.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                )
              ) : (
                <button
                  onClick={() => setOptions(prev => ({ ...prev, [opt.key]: !prev[opt.key] }))}
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    options[opt.key] ? "bg-blue-600" : "bg-slate-300 dark:bg-gray-700"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      options[opt.key] ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              )}
            </div>
          ))}
            </div>
          )}
        </section>

        <section aria-label="Tool workspace" className="flex-1 flex flex-col lg:flex-row min-h-[400px]">
        {/* Input */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-gray-800 min-h-[300px]">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-gray-800 bg-slate-100 dark:bg-gray-900/30 flex justify-between items-center transition-colors">
            <span className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">Input</span>
            <button 
              onClick={handleClear}
              className="text-xs text-slate-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed text-slate-900 dark:text-gray-200 placeholder-slate-400 dark:placeholder-gray-600"
            placeholder="Paste your content here..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-gray-900/20 min-h-[300px] transition-colors">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-gray-800 bg-slate-100 dark:bg-gray-900/30 flex justify-between items-center transition-colors">
             <span className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-wider">Output</span>
             <button 
               onClick={handleCopy}
               disabled={!output}
               className={clsx(
                 "text-xs flex items-center gap-1 transition-colors disabled:opacity-50",
                 copyFeedback ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
               )}
             >
               <Copy className="w-3 h-3" />
               {copyFeedback ? 'Copied!' : 'Copy'}
             </button>
          </div>
          
          <div className="relative flex-1">
             {error ? (
               <div className="absolute inset-0 p-4 text-red-600 dark:text-red-400 font-mono text-sm bg-red-50 dark:bg-red-950/10">
                 <div className="flex items-center gap-2 mb-2 font-bold">
                   <AlertCircle className="w-4 h-4" /> Error
                 </div>
                 {error}
               </div>
             ) : (
               <textarea
                 readOnly
                 value={output}
                 className="absolute inset-0 w-full h-full bg-transparent p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed text-slate-700 dark:text-gray-300"
               />
             )}
          </div>
        </div>
        </section>

        {seoData && (
          <SEOContent
            toolTitle={tool.title}
            primaryKeyword={primaryKeyword}
            whatItDoes={seoData.whatItDoes}
            useCases={seoData.useCases}
            exampleInput={seoData.exampleInput}
            exampleOutput={seoData.exampleOutput}
            faqs={seoData.faqs}
            relatedTools={relatedTools}
          />
        )}
      </main>
    </>
  );
};