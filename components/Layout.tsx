import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TOOLS } from '../config/tools';
import { Terminal, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { ToolCategory } from '../types';

const categories: ToolCategory[] = ['Text', 'Data', 'Time & Encoding'];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const filteredTools = TOOLS.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black text-slate-900 dark:text-gray-200 overflow-hidden font-sans transition-colors duration-200">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-20 bg-slate-50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          <Terminal className="w-6 h-6 text-blue-500" />
          DevUtils
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-gray-400">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-10 w-64 bg-slate-50 dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-slate-200 dark:border-gray-800 hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
            <Terminal className="w-8 h-8 text-blue-500" />
            DevUtils
          </div>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-gray-800">
           <div className="relative">
             <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-gray-500" />
             <input 
              type="text" 
              placeholder="Search tools..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-md py-2 pl-9 pr-4 text-sm text-slate-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-400 dark:placeholder-gray-600"
             />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {categories.map(category => {
            const categoryTools = filteredTools.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wider mb-3 px-2">
                  {category}
                </h3>
                <nav className="space-y-1">
                  {categoryTools.map(tool => (
                    <NavLink
                      key={tool.id}
                      to={tool.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => clsx(
                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors",
                        isActive 
                          ? "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                          : "text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <tool.icon className="w-4 h-4" />
                      {tool.title}
                    </NavLink>
                  ))}
                </nav>
              </div>
            );
          })}
        </div>

        {/* Theme Toggle Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-gray-800">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 px-4 py-2.5 w-full rounded-md text-sm font-medium border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all shadow-sm"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0 bg-white dark:bg-black transition-colors duration-200">
        {children}
      </main>
    </div>
  );
};