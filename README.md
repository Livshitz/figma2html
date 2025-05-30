# Figma JSON to HTML Converter

This TypeScript module converts Figma JSON exports to HTML with inline styles, preserving Figma element names and structure.

## Features

- Converts Figma JSON export to HTML
- Uses inline styles directly from Figma CSS properties
- Preserves Figma element names as data attributes
- Handles INSTANCE elements with special attributes
- Preserves image references as they appear in the JSON
- Fully tested with Jest

## Installation

```bash
npm install
```

## Usage

```typescript
import { FigmaToHtmlConverter } from './dist';
import { readFileSync, writeFileSync } from 'fs';

// Read your Figma JSON export
const figmaJson = JSON.parse(readFileSync('path/to/figma-export.json', 'utf8'));

// Create an instance of the converter
const converter = new FigmaToHtmlConverter();

// Convert the JSON to HTML
const html = converter.convert(figmaJson);

// Use the generated HTML
console.log(html);
// Or save it to a file
writeFileSync('output.html', html);
```

## HTML Output Structure

The converter generates HTML with the following characteristics:

- Each Figma node is converted to an appropriate HTML element
- Figma FRAME and INSTANCE nodes become `<div>` elements
- Figma TEXT nodes become `<p>` elements
- Figma RECTANGLE nodes become `<div>` elements
- All CSS properties are applied as inline styles
- Figma node names are preserved as `data-figma-name` attributes
- Figma node types are preserved as `data-figma-type` attributes
- INSTANCE nodes get an additional `data-figma-instance="true"` attribute

## Building the Project

```bash
npm run build
```

## Testing

```bash
npm test
```

This will run the Jest test suite that validates the converter functionality.
