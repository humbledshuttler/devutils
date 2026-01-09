export interface ToolSEOMetadata {
  primaryKeyword: string;
  metaDescription: string;
  whatItDoes: string;
  useCases: string[];
  exampleInput?: string;
  exampleOutput?: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedToolIds: string[];
}

export const TOOL_SEO: Record<string, ToolSEOMetadata> = {
  'case-converter': {
    primaryKeyword: 'case converter',
    metaDescription: 'Free online case converter tool. Convert text between camelCase, snake_case, PascalCase, kebab-case, and more. Runs 100% in your browser with no data sent to servers.',
    whatItDoes: 'This case converter tool transforms text between different naming conventions commonly used in programming. It automatically detects word boundaries and converts your text to the selected case format, making it perfect for code refactoring, variable naming, and API development.',
    useCases: [
      'Converting API response keys from snake_case to camelCase for JavaScript',
      'Refactoring variable names from one convention to another',
      'Standardizing naming conventions across a codebase',
      'Preparing text for use in different programming languages',
      'Converting database column names to code-friendly formats'
    ],
    exampleInput: 'hello_world_example',
    exampleOutput: 'helloWorldExample',
    faqs: [
      {
        question: 'Does this tool send my data to a server?',
        answer: 'No. All processing happens entirely in your browser. Your text never leaves your device, ensuring complete privacy and security.'
      },
      {
        question: 'What case formats are supported?',
        answer: 'The tool supports camelCase, snake_case, kebab-case, PascalCase, Sentence case, Title Case, UPPERCASE, and lowercase conversions.'
      },
      {
        question: 'Can I convert multiple words at once?',
        answer: 'Yes, the tool automatically detects word boundaries and handles multiple words, numbers, and mixed-case text intelligently.'
      }
    ],
    relatedToolIds: ['whitespace']
  },
  'whitespace': {
    primaryKeyword: 'whitespace cleanup',
    metaDescription: 'Free online whitespace cleanup tool. Remove trailing spaces, normalize line endings, and clean up text formatting. Runs locally in your browser with no server uploads.',
    whatItDoes: 'This whitespace cleanup tool removes unnecessary spaces, normalizes line endings, and cleans up text formatting. It\'s essential for code formatting, data processing, and text normalization tasks.',
    useCases: [
      'Cleaning up copied code with inconsistent indentation',
      'Normalizing line endings between Windows (CRLF) and Unix (LF)',
      'Removing trailing whitespace from files',
      'Preparing text for comparison or diff operations',
      'Cleaning user input before processing'
    ],
    exampleInput: '  hello world  \n\n  test  \r\n  line  ',
    exampleOutput: 'hello world\ntest\nline',
    faqs: [
      {
        question: 'Is my text sent to any server?',
        answer: 'No. All processing is done locally in your browser. Your data never leaves your device.'
      },
      {
        question: 'What does normalize newlines do?',
        answer: 'It converts all line ending types (CRLF, CR, LF) to a single consistent format (LF), which is useful when working across different operating systems.'
      },
      {
        question: 'Will this tool modify my original text?',
        answer: 'The tool only displays the cleaned version. Your original input remains unchanged unless you copy the output.'
      }
    ],
    relatedToolIds: ['case-converter', 'single-line']
  },
  'single-line': {
    primaryKeyword: 'multiline to single line converter',
    metaDescription: 'Free online tool to convert multiline text into a single line. Perfect for pasting JSON into terminals like wscat. Runs 100% in your browser with no data uploads.',
    whatItDoes: 'This multiline to single line converter transforms text with multiple lines into a single continuous line. It\'s essential for pasting multiline JSON, code snippets, or other text into terminal tools like wscat that don\'t handle multiline input well.',
    useCases: [
      'Pasting multiline JSON into terminal tools like wscat',
      'Converting formatted code into a single line for command-line use',
      'Preparing text for URL parameters or single-line input fields',
      'Removing line breaks from copied text',
      'Converting formatted data for API requests that require single-line input'
    ],
    exampleInput: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": ["react", "typescript"]\n}',
    exampleOutput: '{ "name": "example", "version": "1.0.0", "dependencies": ["react", "typescript"] }',
    faqs: [
      {
        question: 'Does this tool send my text to a server?',
        answer: 'No. All conversion happens locally in your browser. Your data never leaves your device.'
      },
      {
        question: 'How are newlines replaced?',
        answer: 'Newlines are replaced with spaces, creating a single continuous line while preserving readability.'
      },
      {
        question: 'Why would I need to convert multiline to single line?',
        answer: 'Many terminal tools and command-line utilities don\'t handle multiline input well. This tool is especially useful when pasting JSON into tools like wscat, curl commands, or single-line input fields.'
      },
      {
        question: 'Will this preserve my JSON formatting?',
        answer: 'The tool removes line breaks, so formatted JSON will become minified. If you need formatted JSON back, you can use the JSON Formatter tool after converting.'
      }
    ],
    relatedToolIds: ['whitespace', 'json-format']
  },
  'json-yaml': {
    primaryKeyword: 'json to yaml converter',
    metaDescription: 'Free online JSON to YAML converter. Convert between JSON and YAML formats instantly. Works entirely in your browser with no data uploads or server processing.',
    whatItDoes: 'This JSON to YAML converter transforms data between JSON (JavaScript Object Notation) and YAML (YAML Ain\'t Markup Language) formats. Both directions are supported, making it perfect for configuration file conversion, API documentation, and DevOps workflows.',
    useCases: [
      'Converting Kubernetes or Docker Compose configuration files',
      'Transforming API documentation between formats',
      'Migrating configuration files between projects',
      'Converting CI/CD pipeline configurations',
      'Working with Ansible playbooks and Terraform configs'
    ],
    exampleInput: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": ["react", "typescript"]\n}',
    exampleOutput: 'name: example\nversion: 1.0.0\ndependencies:\n  - react\n  - typescript',
    faqs: [
      {
        question: 'Does this tool upload my JSON or YAML data?',
        answer: 'No. All conversion happens locally in your browser. Your sensitive configuration data never leaves your device.'
      },
      {
        question: 'What if my JSON is invalid?',
        answer: 'The tool will display an error message indicating what\'s wrong with your JSON syntax, helping you fix it quickly.'
      },
      {
        question: 'Can I convert large configuration files?',
        answer: 'Yes, the tool can handle reasonably large files. However, very large files (several MB) may impact browser performance.'
      },
      {
        question: 'Are comments preserved when converting?',
        answer: 'JSON doesn\'t support comments, so when converting YAML to JSON, comments are lost. When converting JSON to YAML, comments are not added.'
      }
    ],
    relatedToolIds: ['json-format', 'json-validate']
  },
  'json-format': {
    primaryKeyword: 'json formatter',
    metaDescription: 'Free online JSON formatter and minifier. Pretty-print JSON with customizable indentation or minify for production. Runs 100% in your browser with no server uploads.',
    whatItDoes: 'This JSON formatter tool beautifies or minifies JSON data. You can format JSON with 2-space, 4-space, or tab indentation for readability, or minify it by removing all whitespace for production use.',
    useCases: [
      'Formatting API responses for debugging',
      'Pretty-printing JSON configuration files',
      'Minifying JSON for production bundles',
      'Standardizing JSON formatting across projects',
      'Making large JSON files more readable'
    ],
    exampleInput: '{"name":"example","version":"1.0.0","dependencies":["react","typescript"]}',
    exampleOutput: '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": [\n    "react",\n    "typescript"\n  ]\n}',
    faqs: [
      {
        question: 'Is my JSON data sent to any server?',
        answer: 'No. All formatting happens locally in your browser. Your data, including sensitive API keys or tokens, never leaves your device.'
      },
      {
        question: 'What indentation options are available?',
        answer: 'You can choose 2 spaces, 4 spaces, tabs, or minify (0 spaces) for production use.'
      },
      {
        question: 'What happens if my JSON is invalid?',
        answer: 'The tool will display an error message showing the exact location and nature of the JSON syntax error.'
      },
      {
        question: 'Can I format minified JSON from APIs?',
        answer: 'Yes, paste any valid JSON (minified or not) and the tool will format it with your chosen indentation.'
      }
    ],
    relatedToolIds: ['json-yaml', 'json-validate']
  },
  'json-validate': {
    primaryKeyword: 'json validator',
    metaDescription: 'Free online JSON validator. Check JSON syntax and find errors instantly. Validates JSON entirely in your browser with no data uploads.',
    whatItDoes: 'This JSON validator checks if your JSON data is syntactically correct. It identifies errors like missing commas, unclosed brackets, invalid escape sequences, and provides clear error messages to help you fix issues quickly.',
    useCases: [
      'Validating API response data',
      'Checking configuration file syntax',
      'Debugging JSON parsing errors',
      'Verifying JSON before committing to version control',
      'Testing JSON from external APIs'
    ],
    exampleInput: '{\n  "name": "example",\n  "invalid": json\n}',
    exampleOutput: 'Invalid JSON ❌\n\nUnexpected token \'j\', "invalid": json is not valid JSON',
    faqs: [
      {
        question: 'Does this tool send my JSON to a server?',
        answer: 'No. Validation happens entirely in your browser. Your JSON data, including sensitive information, never leaves your device.'
      },
      {
        question: 'What types of errors does it detect?',
        answer: 'The tool detects syntax errors like missing commas, unclosed brackets/braces, invalid escape sequences, trailing commas, and malformed strings or numbers.'
      },
      {
        question: 'Can it validate JSON with comments?',
        answer: 'No. Standard JSON doesn\'t support comments. If you need comments, consider using JSONC (JSON with Comments) or convert to YAML.'
      },
      {
        question: 'Does it check JSON schema or just syntax?',
        answer: 'This tool validates JSON syntax only. For schema validation (checking data structure against a schema), you would need a separate schema validation tool.'
      }
    ],
    relatedToolIds: ['json-format', 'json-yaml']
  },
  'base64': {
    primaryKeyword: 'base64 encoder',
    metaDescription: 'Free online Base64 encoder and decoder. Encode text to Base64 or decode Base64 strings instantly. Runs 100% in your browser with no server uploads.',
    whatItDoes: 'This Base64 encoder/decoder tool converts text to Base64 encoding and vice versa. Base64 encoding is commonly used for encoding binary data in text formats, embedding data in URLs, and storing binary data in JSON or XML.',
    useCases: [
      'Encoding data for use in URLs or HTTP headers',
      'Embedding images or files in JSON/XML as Base64 strings',
      'Encoding credentials for basic authentication',
      'Converting binary data to text format for transmission',
      'Decoding Base64 strings from APIs or configuration files'
    ],
    exampleInput: 'Hello, World!',
    exampleOutput: 'SGVsbG8sIFdvcmxkIQ==',
    faqs: [
      {
        question: 'Is my data sent to any server when encoding or decoding?',
        answer: 'No. All Base64 encoding and decoding happens locally in your browser. Your sensitive data never leaves your device.'
      },
      {
        question: 'Can I encode binary files?',
        answer: 'Yes, you can paste binary data, but for large files, it\'s more efficient to use command-line tools. This tool is best for text and small data.'
      },
      {
        question: 'What is Base64 encoding used for?',
        answer: 'Base64 is commonly used for encoding binary data in text formats, embedding data in URLs, email attachments (MIME), and storing binary data in JSON or XML.'
      },
      {
        question: 'Is Base64 encryption?',
        answer: 'No. Base64 is encoding, not encryption. It\'s easily reversible and should not be used for security purposes. Anyone can decode Base64 data.'
      }
    ],
    relatedToolIds: ['jwt-decode']
  },
  'jwt-decode': {
    primaryKeyword: 'jwt decoder',
    metaDescription: 'Free online JWT decoder. Decode JSON Web Tokens to view header and payload without verification. Runs entirely in your browser with no server uploads.',
    whatItDoes: 'This JWT decoder tool decodes JSON Web Tokens (JWTs) to display the header and payload in readable JSON format. It does not verify the token signature—it only decodes the base64-encoded parts for inspection and debugging.',
    useCases: [
      'Debugging JWT tokens during development',
      'Inspecting token claims and expiration',
      'Understanding JWT structure and contents',
      'Verifying token payload before sending to APIs',
      'Learning how JWTs are structured'
    ],
    exampleInput: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    exampleOutput: '{\n  "header": {\n    "alg": "HS256",\n    "typ": "JWT"\n  },\n  "payload": {\n    "sub": "1234567890",\n    "name": "John Doe",\n    "iat": 1516239022\n  }\n}',
    faqs: [
      {
        question: 'Does this tool send my JWT token to a server?',
        answer: 'No. All decoding happens locally in your browser. Your JWT tokens, which may contain sensitive information, never leave your device.'
      },
      {
        question: 'Does this tool verify the JWT signature?',
        answer: 'No. This tool only decodes the base64-encoded header and payload. It does not verify the token signature or validate the token\'s authenticity.'
      },
      {
        question: 'Can I decode expired tokens?',
        answer: 'Yes. The tool will decode any valid JWT format regardless of expiration. It\'s up to you to check the expiration claim in the payload.'
      },
      {
        question: 'Is it safe to decode production JWT tokens?',
        answer: 'Since decoding happens locally in your browser, it\'s safe from a network perspective. However, be cautious about exposing sensitive claims in the payload.'
      },
      {
        question: 'What if my JWT is malformed?',
        answer: 'The tool will display an error message if the JWT format is invalid (wrong number of parts, invalid base64 encoding, etc.).'
      }
    ],
    relatedToolIds: ['base64']
  }
};
