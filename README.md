# Advanced Spreadsheet Clone

## Overview
This web application replicates core functionalities of Google Sheets while extending them with advanced features. It including:
- A modern, responsive user interface built using Bootstrap.
- Dynamic addition and deletion of rows and columns.
- Advanced cell formatting options (bold, italic, font size, font color).
- A robust formula evaluator supporting functions such as sum, average, max, min, count, and basic text operations.
- Support for both relative and absolute cell references in formulas.
- Drag-and-drop functionality for cell repositioning powered by InteractJS.
- Saving and loading spreadsheets via localStorage.
- Resizable columns for enhanced customization.

## File Structure and Technologies
- **index.html:**  
  Contains UI structure with header controls, toolbar, formula bar, and container for the dynamically generated spreadsheet grid.
- **style.css:**  
  Provides custom styling for the UI, spreadsheet grid, selected cells, and includes visual enhancements such as resizable column handles.
- **utility.js:**  
  Implements mathematical functions, data quality functions, and an advanced formula evaluator.
- **spreadsheet.js:**  
  Manages grid generation, dynamic row/column adjustments, cell event handling, drag-and-drop interactions, and persistence (save/load).
- **README.md:**  
  Documentation covering design decisions, technologies used, and instructions for getting started.

## Getting Started
1. Open `index.html` in any modern browser.
2. Click on a cell to select it; the corresponding formula/text will appear in the formula bar.
3. Edit cell values directly or via the formula bar; formulas should start with "=".
4. Use header controls to add or delete rows/columns and to save or load your spreadsheet.
5. Adjust cell formatting using the toolbar options.  
   
This implementation adheres to the detailed assignment specifications and incorporates bonus functionalities to closely mimic the advanced features of Google Sheets.
