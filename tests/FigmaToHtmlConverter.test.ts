import { FigmaToHtmlConverter } from '../src/FigmaToHtmlConverter';
import { FigmaJSON, FigmaNode } from '../src/types';

describe('FigmaToHtmlConverter', () => {
  let converter: FigmaToHtmlConverter;

  beforeEach(() => {
    converter = new FigmaToHtmlConverter();
  });

  describe('convert', () => {
    it('should convert an empty array to an empty string', () => {
      const result = converter.convert([]);
      expect(result).toBe('');
    });

    it('should convert a simple node correctly', () => {
      const simpleNode: FigmaNode = {
        cssProps: { width: '100px', height: '100px' },
        type: 'FRAME',
        name: 'Simple Frame'
      };

      const result = converter.convert([simpleNode]);
      
      expect(result).toContain('<div');
      expect(result).toContain('data-figma-name="Simple Frame"');
      expect(result).toContain('data-figma-type="FRAME"');
      expect(result).toContain('style="width: 100px; height: 100px;"');
      expect(result).toContain('</div>');
    });

    it('should handle TEXT nodes with characters', () => {
      const textNode: FigmaNode = {
        cssProps: { color: 'red', 'font-size': '16px' },
        type: 'TEXT',
        name: 'Text Node',
        characters: 'Hello World'
      };

      const result = converter.convert([textNode]);
      
      expect(result).toContain('<p');
      expect(result).toContain('data-figma-name="Text Node"');
      expect(result).toContain('data-figma-type="TEXT"');
      expect(result).toContain('style="color: red; font-size: 16px;"');
      expect(result).toContain('>Hello World</p>');
    });

    it('should handle INSTANCE nodes with special attribute', () => {
      const instanceNode: FigmaNode = {
        cssProps: { width: '200px' },
        type: 'INSTANCE',
        name: 'Instance Node'
      };

      const result = converter.convert([instanceNode]);
      
      expect(result).toContain('data-figma-instance="true"');
    });

    it('should handle nested children correctly', () => {
      const parentNode: FigmaNode = {
        cssProps: { display: 'flex' },
        type: 'FRAME',
        name: 'Parent Frame',
        children: [
          {
            cssProps: { width: '50px' },
            type: 'RECTANGLE',
            name: 'Child Rectangle'
          }
        ]
      };

      const result = converter.convert([parentNode]);
      
      expect(result).toContain('data-figma-name="Parent Frame"');
      expect(result).toContain('data-figma-name="Child Rectangle"');
      expect(result).toContain('data-figma-type="RECTANGLE"');
    });

    it('should escape HTML in text content', () => {
      const textNode: FigmaNode = {
        cssProps: {},
        type: 'TEXT',
        name: 'Escaped Text',
        characters: '<script>alert("XSS")</script>'
      };

      const result = converter.convert([textNode]);
      
      expect(result).not.toContain('<script>');
      expect(result).toContain('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
    });

    it('should escape attribute values', () => {
      const nodeWithSpecialChars: FigmaNode = {
        cssProps: {},
        type: 'FRAME',
        name: 'Name with "quotes" & <tags>'
      };

      const result = converter.convert([nodeWithSpecialChars]);
      
      expect(result).toContain('data-figma-name="Name with &quot;quotes&quot; &amp; &lt;tags&gt;"');
    });
  });

  describe('complex scenarios', () => {
    it('should handle a complex nested structure', () => {
      const complexJson: FigmaJSON = [
        {
          cssProps: { display: 'flex', width: '390px' },
          type: 'FRAME',
          name: 'Frame 372',
          children: [
            {
              cssProps: { display: 'flex', height: '72px' },
              type: 'FRAME',
              name: '.row',
              children: [
                {
                  cssProps: { width: '14px', height: '34px' },
                  type: 'RECTANGLE',
                  name: 'Rectangle 144524'
                },
                {
                  cssProps: { flex: '1 0 0', color: '#121417' },
                  characters: 'Ethan Carter',
                  type: 'TEXT',
                  name: 'Ethan Carter'
                }
              ]
            }
          ]
        }
      ];

      const result = converter.convert(complexJson);
      
      // Check for parent frame
      expect(result).toContain('data-figma-name="Frame 372"');
      
      // Check for row
      expect(result).toContain('data-figma-name=".row"');
      
      // Check for rectangle
      expect(result).toContain('data-figma-name="Rectangle 144524"');
      
      // Check for text
      expect(result).toContain('data-figma-name="Ethan Carter"');
      expect(result).toContain('>Ethan Carter</p>');
      
      // Check nesting structure
      const frameIndex = result.indexOf('data-figma-name="Frame 372"');
      const rowIndex = result.indexOf('data-figma-name=".row"');
      const rectangleIndex = result.indexOf('data-figma-name="Rectangle 144524"');
      const textIndex = result.indexOf('data-figma-name="Ethan Carter"');
      
      expect(frameIndex).toBeLessThan(rowIndex);
      expect(rowIndex).toBeLessThan(rectangleIndex);
      expect(rectangleIndex).toBeLessThan(textIndex);
    });
  });
});
