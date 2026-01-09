import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../config/tools';
import { SEOHead } from './SEOHead';
import { Wrench } from 'lucide-react';

export const ToolsIndex: React.FC = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DevUtils - Free Online Developer Tools',
    description: 'A collection of free, offline developer tools that run 100% in your browser. No data leaves your device. Tools for text conversion, JSON/YAML processing, encoding, and more.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    url: baseUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1'
    }
  };

  const categories = ['Text', 'Data', 'Time & Encoding'] as const;

  return (
    <>
      <SEOHead
        title="Free Online Developer Tools – DevUtils"
        description="Free online developer tools that run 100% in your browser. JSON formatter, case converter, Base64 encoder, JWT decoder, and more. No data leaves your device."
        canonicalUrl={baseUrl}
        keywords={['developer tools', 'online tools', 'json formatter', 'case converter', 'base64 encoder', 'jwt decoder', 'yaml converter', 'free tools']}
        structuredData={structuredData}
      />
      <main className="flex flex-col items-center text-center p-8 overflow-y-auto">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-6 transition-colors mt-8">
          <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Free Online Developer Tools</h1>
        <p className="text-slate-600 dark:text-gray-400 max-w-2xl mb-12">
          A collection of fast, privacy-focused developer utilities. All tools run 100% in your browser. 
          No data leaves your device. No tracking. No analytics. Just tools that work.
        </p>

        <section className="w-full max-w-5xl space-y-12">
          {categories.map(category => {
            const categoryTools = TOOLS.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <article key={category}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-left">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="p-6 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20 transition-colors">
                          <tool.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-16 max-w-3xl text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            About These Tools
          </h2>
          <div className="space-y-4 text-slate-700 dark:text-gray-300">
            <p>
              DevUtils provides a collection of essential developer tools that work entirely in your browser. 
              Whether you're converting JSON to YAML, formatting code, encoding Base64 strings, or validating data, 
              all processing happens locally on your device.
            </p>
            <p>
              <strong>Privacy First:</strong> No analytics, no tracking, no cookies. Your data never leaves your browser. 
              These tools are designed for developers who value speed, privacy, and reliability.
            </p>
            <p>
              <strong>No Installation Required:</strong> All tools run in your web browser. No downloads, no plugins, 
              no account creation. Just open the tool you need and start working.
            </p>
            <p>
              <strong>Fast & Reliable:</strong> Built with modern web technologies for instant results. 
              Perfect for quick conversions, validations, and transformations during development.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
