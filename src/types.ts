/**
 * Types for Figma JSON structure
 */

export interface CSSProps {
  [key: string]: string;
}

export interface FigmaNode {
  cssProps: CSSProps;
  type: string;
  name: string;
  children?: FigmaNode[];
  characters?: string;
}

export type FigmaJSON = FigmaNode[];
