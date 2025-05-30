import { FigmaToHtmlConverter } from '../src/FigmaToHtmlConverter';
import { FigmaJSON } from '../src/types';
import * as fs from 'fs';

// Sample Figma JSON data from the provided file
const sampleJson: FigmaJSON = [
    {
        "cssProps": {
            "display": "flex",
            "width": "390px",
            "flex-direction": "column",
            "align-items": "center"
        },
        "type": "FRAME",
        "name": "Frame 372",
        "children": [
            {
                "cssProps": {
                    "display": "flex",
                    "height": "72px",
                    "padding": "0px 16px",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "align-self": "stretch",
                    "border": "1px dashed rgba(0, 0, 0, 0.30)"
                },
                "type": "FRAME",
                "name": ".row",
                "children": [
                    {
                        "cssProps": {
                            "width": "14px",
                            "height": "34px",
                            "background": "#D9D9D9"
                        },
                        "type": "RECTANGLE",
                        "name": "Rectangle 144524"
                    },
                    {
                        "cssProps": {
                            "flex": "1 0 0",
                            "color": "#121417",
                            "text-align": "center",
                            "font-feature-settings": "'dlig' on",
                            "font-family": "Inter",
                            "font-size": "18px",
                            "font-style": "normal",
                            "font-weight": "700",
                            "line-height": "23px /* 127.778% */"
                        },
                        "characters": "Ethan Carter",
                        "type": "TEXT",
                        "name": "Ethan Carter"
                    },
                    {
                        "cssProps": {
                            "width": "24px",
                            "height": "24px",
                            "fill": "#121417"
                        },
                        "type": "RECTANGLE",
                        "name": "Vector - 0"
                    }
                ]
            }
        ]
    }
];

// Create an instance of the converter
const converter = new FigmaToHtmlConverter();

// Convert the sample JSON to HTML
const html = converter.convert(sampleJson);

// Write the HTML to a file for inspection
fs.writeFileSync('output.html', html);

console.log('HTML output generated and saved to output.html');
console.log('Sample of the generated HTML:');
console.log(html.substring(0, 500) + '...');
