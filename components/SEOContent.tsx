import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOContentProps {
  toolTitle: string;
  primaryKeyword: string;
  whatItDoes: string;
  useCases: string[];
  exampleInput?: string;
  exampleOutput?: string;
  faqs: FAQ[];
  relatedTools?: Array<{ path: string; title: string }>;
}

export const SEOContent: React.FC<SEOContentProps> = ({
  toolTitle,
  primaryKeyword,
  whatItDoes,
  useCases,
  exampleInput,
  exampleOutput,
  faqs,
  relatedTools
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <article className="px-8 py-12 max-w-4xl mx-auto space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          What This Tool Does
        </h2>
        <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
          {whatItDoes}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Common Use Cases
        </h2>
        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
          {useCases.map((useCase, idx) => (
            <li key={idx}>{useCase}</li>
          ))}
        </ul>
      </section>

      {(exampleInput || exampleOutput) && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Example
          </h2>
          <div className="space-y-4">
            {exampleInput && (
              <div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Input
                </h3>
                <pre className="bg-slate-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto border border-slate-200 dark:border-gray-800">
                  <code className="text-sm text-slate-900 dark:text-gray-200 font-mono">
                    {exampleInput}
                  </code>
                </pre>
              </div>
            )}
            {exampleOutput && (
              <div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Output
                </h3>
                <pre className="bg-slate-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto border border-slate-200 dark:border-gray-800">
                  <code className="text-sm text-slate-900 dark:text-gray-200 font-mono">
                    {exampleOutput}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-gray-800 rounded-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left bg-slate-50 dark:bg-gray-900 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-600 dark:text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600 dark:text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 py-3 bg-white dark:bg-black border-t border-slate-200 dark:border-gray-800">
                    <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Related Tools
          </h2>
          <ul className="flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <li key={tool.path}>
                <Link
                  to={tool.path}
                  className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors text-sm font-medium"
                >
                  {tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};
