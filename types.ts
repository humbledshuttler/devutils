import React from 'react';

export type ToolCategory = 'Text' | 'Data' | 'Time & Encoding';

export interface ToolOption {
  key: string;
  label: string;
  type: 'select' | 'boolean';
  display?: 'dropdown' | 'buttons';
  options?: { value: string; label: string }[]; // For select type
  defaultValue: string | boolean;
}

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  options?: ToolOption[];
  transform: (input: string, options: Record<string, any>) => string;
}

export interface TransformerResult {
  success: boolean;
  data: string;
  error?: string;
}