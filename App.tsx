import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToolShell } from './components/ToolShell';
import { TOOLS } from './config/tools';
import { Wrench } from 'lucide-react';

const Dashboard = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-6 transition-colors">
      <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-500" />
    </div>
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">DevUtils MVP</h1>
    <p className="text-slate-600 dark:text-gray-400 max-w-md">
      Select a tool from the sidebar to get started. 
      All tools run 100% in your browser. No data leaves your device.
    </p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {TOOLS.map(tool => (
        <Route 
          key={tool.id} 
          path={tool.path} 
          element={<ToolShell tool={tool} />} 
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  );
}