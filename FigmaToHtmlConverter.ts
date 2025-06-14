import { readFileSync, writeFileSync } from 'fs';
import { FigmaJSON } from '../types';

export class FigmaToHtmlConverter {
  convert(input: any): string {
    return '';
  }
}

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', chunk => data += chunk);
    process.stdin.on('end', () => resolve(data));
  });
}

if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.error('Usage: bun FigmaToHtmlConverter.ts <input.json|- for stdin> <output.html>');
      process.exit(1);
    }
    const [inputPath, outputPath] = args;
    let jsonStr: string;
    if (inputPath === '-') {
      console.log('Paste your JSON and press Ctrl+D when done:');
      jsonStr = await readStdin();
    } else {
      jsonStr = readFileSync(inputPath, 'utf-8');
    }
    const json = JSON.parse(jsonStr) as FigmaJSON;
    const html = new FigmaToHtmlConverter().convert(json);
    writeFileSync(outputPath, html, 'utf-8');
    console.log(`HTML written to ${outputPath}`);
  })();
} 