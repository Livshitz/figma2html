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

// Convert the JSON to Pug
const pug = converter.convertToPug(figmaJson);

// Use the generated HTML or Pug
console.log(html);
console.log(pug);
// Or save it to a file
writeFileSync('output.html', html);
writeFileSync('output.pug', pug);
```

## CLI Usage

You can now output Pug directly from the CLI:

```bash
bun run bin/figma2html.ts input.json --pug
# or
bun run bin/figma2html.ts input.json output.pug --pug
```

- Use `--pug` or `-p` to output Pug instead of HTML.
- Output file extension will be `.pug` if not specified.

## Run via NPX

You can run the CLI directly without installing:

```bash
npx figma2html input.json --pug
# or
npx figma2html input.json output.pug --pug
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
