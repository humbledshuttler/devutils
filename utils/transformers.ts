import jsYaml from 'js-yaml';

/**
 * Pure transformation functions.
 * All functions accept a string input and an options object.
 * They return a string output or throw an error.
 */

// --- Text Utilities ---

export const transformCase = (input: string, options: { mode: string }): string => {
  if (!input) return '';
  
  const words = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
  
  switch (options.mode) {
    case 'camel':
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'snake':
      return words.map(w => w.toLowerCase()).join('_');
    case 'kebab':
      return words.map(w => w.toLowerCase()).join('-');
    case 'pascal':
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'sentence':
      const lower = words.map(w => w.toLowerCase()).join(' ');
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    case 'title':
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    case 'upper':
      return input.toUpperCase();
    case 'lower':
      return input.toLowerCase();
    default:
      return input;
  }
};

export const cleanupWhitespace = (input: string, options: { trim: boolean, normalizeLines: boolean }): string => {
  let output = input;
  if (options.normalizeLines) {
    output = output.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    output = output.replace(/\n{2,}/g, '\n'); // Collapse multiple newlines
  }
  if (options.trim) {
    output = output.split('\n').map(l => l.trim()).join('\n').trim();
  }
  return output;
};

export const toSingleLine = (input: string, options: Record<string, any>): string => {
  if (!input) return '';
  let output = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  output = output.replace(/\n/g, ' ');
  return output;
};

// --- Data Utilities ---

export const convertJsonYaml = (input: string, options: { direction: 'json-to-yaml' | 'yaml-to-json' }): string => {
  if (!input.trim()) return '';

  if (options.direction === 'json-to-yaml') {
    const obj = JSON.parse(input);
    return jsYaml.dump(obj);
  } else {
    const obj = jsYaml.load(input);
    return JSON.stringify(obj, null, 2);
  }
};

export const formatJson = (input: string, options: { indent: string }): string => {
  if (!input.trim()) return '';
  const obj = JSON.parse(input);
  const space = options.indent === 'tab' ? '\t' : parseInt(options.indent, 10) || 2;
  return JSON.stringify(obj, null, space);
};

export const validateJson = (input: string): string => {
  if (!input.trim()) return 'Waiting for input...';
  try {
    JSON.parse(input);
    return 'Valid JSON ✅';
  } catch (e: any) {
    return `Invalid JSON ❌\n\n${e.message}`;
  }
};

// --- Time & Encoding ---

export const base64Transform = (input: string, options: { operation: 'encode' | 'decode' }): string => {
  if (!input) return '';
  if (options.operation === 'encode') {
    return btoa(unescape(encodeURIComponent(input)));
  } else {
    return decodeURIComponent(escape(atob(input)));
  }
};

export const jwtDecode = (input: string): string => {
  if (!input) return '';
  const parts = input.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  const decodePart = (part: string) => {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(part.replace(/-/g, '+').replace(/_/g, '/')))));
    } catch (e) {
      return { error: 'Failed to decode part' };
    }
  };

  const header = decodePart(parts[0]);
  const payload = decodePart(parts[1]);

  return JSON.stringify({ header, payload }, null, 2);
};