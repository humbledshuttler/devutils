import { ToolDefinition } from '../types';
import * as T from '../utils/transformers';
import { 
  Type, 
  FileJson, 
  AlignLeft, 
  Code, 
  Clock, 
  Globe, 
  Binary, 
  ShieldCheck,
  FileCode
} from 'lucide-react';

export const TOOLS: ToolDefinition[] = [
  // --- Text ---
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text between camelCase, snake_case, PascalCase, and more.',
    category: 'Text',
    path: '/text/case',
    icon: Type,
    options: [
      {
        key: 'mode',
        label: 'Conversion Mode',
        type: 'select',
        display: 'buttons',
        defaultValue: 'camel',
        options: [
          { value: 'camel', label: 'camelCase' },
          { value: 'snake', label: 'snake_case' },
          { value: 'kebab', label: 'kebab-case' },
          { value: 'pascal', label: 'PascalCase' },
          { value: 'sentence', label: 'Sentence case' },
          { value: 'title', label: 'Title Case' },
          { value: 'upper', label: 'UPPERCASE' },
          { value: 'lower', label: 'lowercase' },
        ]
      }
    ],
    transform: T.transformCase
  },
  {
    id: 'whitespace',
    title: 'Whitespace Cleanup',
    description: 'Trim trailing spaces and normalize newlines.',
    category: 'Text',
    path: '/text/whitespace',
    icon: AlignLeft,
    options: [
      { key: 'trim', label: 'Trim Lines', type: 'boolean', defaultValue: true },
      { key: 'normalizeLines', label: 'Normalize Newlines', type: 'boolean', defaultValue: true }
    ],
    transform: T.cleanupWhitespace
  },

  // --- Data ---
  {
    id: 'json-yaml',
    title: 'JSON <> YAML',
    description: 'Convert JSON data to YAML and vice-versa.',
    category: 'Data',
    path: '/data/json-yaml',
    icon: FileCode,
    options: [
      {
        key: 'direction',
        label: 'Direction',
        type: 'select',
        defaultValue: 'json-to-yaml',
        options: [
          { value: 'json-to-yaml', label: 'JSON to YAML' },
          { value: 'yaml-to-json', label: 'YAML to JSON' }
        ]
      }
    ],
    transform: T.convertJsonYaml
  },
  {
    id: 'json-format',
    title: 'JSON Formatter',
    description: 'Prettify or minify JSON with customizable indentation.',
    category: 'Data',
    path: '/data/json-format',
    icon: FileJson,
    options: [
      {
        key: 'indent',
        label: 'Indentation',
        type: 'select',
        defaultValue: '2',
        options: [
          { value: '2', label: '2 Spaces' },
          { value: '4', label: '4 Spaces' },
          { value: 'tab', label: 'Tab' },
          { value: '0', label: 'Minify (0 spaces)' },
        ]
      }
    ],
    transform: T.formatJson
  },
  {
    id: 'json-validate',
    title: 'JSON Validator',
    description: 'Validate JSON and see syntax errors.',
    category: 'Data',
    path: '/data/validate',
    icon: ShieldCheck,
    transform: T.validateJson
  },

  // --- Time & Encoding ---
  {
    id: 'base64',
    title: 'Base64 Encoder',
    description: 'Encode and decode text to Base64.',
    category: 'Time & Encoding',
    path: '/encoding/base64',
    icon: Binary,
    options: [
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'encode',
        options: [
          { value: 'encode', label: 'Encode' },
          { value: 'decode', label: 'Decode' }
        ]
      }
    ],
    transform: T.base64Transform
  },
  {
    id: 'jwt-decode',
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to view header and payload.',
    category: 'Time & Encoding',
    path: '/encoding/jwt',
    icon: Code,
    transform: T.jwtDecode
  }
];

export const getToolByPath = (path: string) => TOOLS.find(t => t.path === path);