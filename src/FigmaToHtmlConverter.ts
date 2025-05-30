import { FigmaJSON, FigmaNode } from './types';

/**
 * FigmaToHtmlConverter
 * A TypeScript class that converts Figma JSON export to HTML
 */
export class FigmaToHtmlConverter {
  /**
   * Convert Figma JSON to HTML string
   * @param figmaJson The Figma JSON export
   * @returns HTML string representation
   */
  public convert(figmaJson: FigmaJSON): string {
    let html = '';
    
    // Process each top-level node
    figmaJson.forEach(node => {
      html += this.processNode(node);
    });
    
    return html;
  }
  
  /**
   * Process a single Figma node and convert it to HTML
   * @param node The Figma node to process
   * @returns HTML string for the node
   */
  private processNode(node: FigmaNode): string {
    // Determine the HTML element type based on Figma node type
    const elementType = this.getHtmlElementType(node.type);
    
    // Start the HTML element
    let html = `<${elementType} `;
    
    // Add data attribute for Figma node name
    html += `data-figma-name="${this.escapeAttribute(node.name)}" `;
    
    // Add data attribute for Figma node type
    html += `data-figma-type="${node.type}" `;
    
    // If it's an INSTANCE, add a specific attribute
    if (node.type === 'INSTANCE') {
      html += `data-figma-instance="true" `;
    }
    
    // Add inline styles from cssProps
    html += `style="${this.convertCssProps(node.cssProps)}" `;
    
    // Close the opening tag
    html += '>';
    
    // Add text content if it exists
    if (node.type === 'TEXT' && node.characters) {
      html += this.escapeHtml(node.characters);
    }
    
    // Process children recursively
    if (node.children && node.children.length > 0) {
      node.children.forEach(childNode => {
        html += this.processNode(childNode);
      });
    }
    
    // Close the HTML element
    html += `</${elementType}>`;
    
    return html;
  }
  
  /**
   * Convert Figma node type to appropriate HTML element
   * @param nodeType The Figma node type
   * @returns HTML element tag name
   */
  private getHtmlElementType(nodeType: string): string {
    switch (nodeType) {
      case 'FRAME':
      case 'INSTANCE':
        return 'div';
      case 'TEXT':
        return 'p';
      case 'RECTANGLE':
        return 'div';
      default:
        return 'div'; // Default to div for unknown types
    }
  }
  
  /**
   * Convert CSS properties object to inline style string
   * @param cssProps The CSS properties object
   * @returns Inline style string
   */
  private convertCssProps(cssProps: { [key: string]: string }): string {
    return Object.entries(cssProps)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
  }
  
  /**
   * Escape HTML special characters
   * @param html The HTML string to escape
   * @returns Escaped HTML string
   */
  private escapeHtml(html: string): string {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  /**
   * Escape attribute values
   * @param value The attribute value to escape
   * @returns Escaped attribute value
   */
  private escapeAttribute(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
