import { FigmaJSON } from './types';

/**
 * Example usage of the FigmaToHtmlConverter
 * This file demonstrates how to use the converter with a sample Figma JSON
 */

import { FigmaToHtmlConverter } from './FigmaToHtmlConverter';

/**
 * Convert Figma JSON to HTML
 * @param figmaJson The Figma JSON to convert
 * @returns HTML string
 */
export function convertFigmaJsonToHtml(figmaJson: FigmaJSON): string {
  const converter = new FigmaToHtmlConverter();
  return converter.convert(figmaJson);
}

// Export the main converter class
export { FigmaToHtmlConverter };
