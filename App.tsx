import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToolShell } from './components/ToolShell';
import { ToolsIndex } from './components/ToolsIndex';
import { TOOLS } from './config/tools';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ToolsIndex />} />
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
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}