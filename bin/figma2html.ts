#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'fs';
import { FigmaToHtmlConverter } from '../src/FigmaToHtmlConverter';
import { FigmaJSON } from '../src/types';

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', chunk => data += chunk);
    process.stdin.on('end', () => resolve(data));
  });
}

(async () => {
  const args = process.argv.slice(2);
  let inputPath: string | undefined;
  let outputPath: string;
  let jsonStr: string;
  let toPug = false;

  // Check for --pug or -p flag
  if (args.includes('--pug') || args.includes('-p')) {
    toPug = true;
    // Remove the flag from args
    const idx = args.indexOf('--pug') !== -1 ? args.indexOf('--pug') : args.indexOf('-p');
    args.splice(idx, 1);
  }

  if (args.length === 0) {
    // Zero args: prompt for input, output to .tmp/output.html or .pug
    inputPath = '-';
    outputPath = `.tmp/output.${toPug ? 'pug' : 'html'}`;
    console.log('Paste your JSON and press Ctrl+D when done:');
    jsonStr = await readStdin();
  } else if (args.length === 1) {
    // One arg: treat as input file, output to <input>.html or .pug in same dir
    inputPath = args[0];
    const inputBase = inputPath.replace(/\.[^.]+$/, '');
    outputPath = `${inputBase}.${toPug ? 'pug' : 'html'}`;
    jsonStr = readFileSync(inputPath, 'utf-8');
  } else if (args.length === 2) {
    // Two args: input and output
    [inputPath, outputPath] = args;
    if (inputPath === '-') {
      console.log('Paste your JSON and press Ctrl+D when done:');
      jsonStr = await readStdin();
    } else {
      jsonStr = readFileSync(inputPath, 'utf-8');
    }
  } else {
    console.error('Usage: figma2html [<input.json|- for stdin> [<output.html|output.pug>] [--pug|-p]]');
    process.exit(1);
  }

  const json = JSON.parse(jsonStr) as FigmaJSON;
  const converter = new FigmaToHtmlConverter();
  const output = toPug ? converter.convertToPug(json) : converter.convert(json);
  writeFileSync(outputPath, output, 'utf-8');
  console.log(`${toPug ? 'Pug' : 'HTML'} written to ${outputPath}`);
})(); 