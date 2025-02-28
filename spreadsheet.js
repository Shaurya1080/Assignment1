document.addEventListener("DOMContentLoaded", function () {
    const DEFAULT_ROWS = 10;
    const DEFAULT_COLS = 10;
    let numRows = DEFAULT_ROWS;
    let numCols = DEFAULT_COLS;
    const spreadsheetContainer = document.getElementById("spreadsheet-container");
  
    // Storage for cell data: key is a cell ID (e.g., 'A1'), value is the raw text or a formula string.
    let cellData = {};
  
    // Function to build the grid/table
    function buildGrid() {
      spreadsheetContainer.innerHTML = "";
      const table = document.createElement("table");
  
      // Create column headers (first row)
      const headerRow = document.createElement("tr");
      const cornerTh = document.createElement("th");
      headerRow.appendChild(cornerTh);
      for (let c = 0; c < numCols; c++) {
        const th = document.createElement("th");
        th.innerText = String.fromCharCode(65 + c); // A, B, C, ...
        headerRow.appendChild(th);
      }
      table.appendChild(headerRow);
  
      // Create data rows with cells
      for (let r = 1; r <= numRows; r++) {
        const tr = document.createElement("tr");
  
        // Row header (display row number)
        const rowHeader = document.createElement("th");
        rowHeader.innerText = r;
        tr.appendChild(rowHeader);
  
        // Create each cell in the row
        for (let c = 0; c < numCols; c++) {
          const td = document.createElement("td");
          const cellId = String.fromCharCode(65 + c) + r; // e.g., "A1", "B2"
          if (!(cellId in cellData)) {
            cellData[cellId] = "";
          }
  
          // Create an input element for the cell
          const input = document.createElement("input");
          input.type = "text";
          input.value = cellData[cellId];
          input.dataset.cellId = cellId;
          input.classList.add("cell-input");
  
          // Save cell data whenever it changes (on blur/change)
          input.addEventListener("change", function () {
            cellData[cellId] = input.value;
            recalcCells(); // Attempt to recalc formulas if needed
          });
  
          // Handle the Enter key:
          // Save the current cell's value and move focus to the cell in the same column of the next row.
          input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
              event.preventDefault(); // Prevent default behavior (like form submission)
              cellData[cellId] = input.value; // Save current value
              recalcCells(); // Recalculate formulas if needed
  
              // Extract the current cell's column letter(s) and row number using regex
              const match = cellId.match(/^([A-Z]+)(\d+)$/);
              if (match) {
                const colLetters = match[1];
                const currentRow = parseInt(match[2]);
                const nextRow = currentRow + 1;
                if (nextRow <= numRows) {
                  const nextCellId = colLetters + nextRow;
                  const nextInput = document.querySelector(`input[data-cell-id="${nextCellId}"]`);
                  if (nextInput) {
                    nextInput.focus();
                  }
                } else {
                  alert("You have reached the last row!");
                }
              }
            }
          });
  
          td.appendChild(input);
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      spreadsheetContainer.appendChild(table);
    }
  
    // Function to recalculate cells containing formulas.
    // (This is a placeholder; the actual evaluateFormula function can be defined in utility.js.)
    function recalcCells() {
      for (const cellId in cellData) {
        const value = cellData[cellId];
        if (typeof value === "string" && value.startsWith("=")) {
          const result = evaluateFormula(value, cellData);  // Assume evaluateFormula() is defined elsewhere.
          // Keep the formula in cellData but update the displayed value.
          const inputElement = document.querySelector(`input[data-cell-id="${cellId}"]`);
          if (inputElement) {
            inputElement.value = result;
          }
        }
      }
    }
  
    // Function to add a new row at the bottom of the grid
    function addRow() {
      numRows++;
      buildGrid();
    }
  
    // Function to delete the last row (if more than one row exists)
    function deleteRow() {
      if (numRows > 1) {
        // Remove the data for each cell in the last row
        for (let c = 0; c < numCols; c++) {
          const cellId = String.fromCharCode(65 + c) + numRows;
          delete cellData[cellId];
        }
        numRows--;
        buildGrid();
      } else {
        alert("Cannot delete the last row!");
      }
    }
  
    // Function to add a new column on the right side of the grid
    function addColumn() {
      numCols++;
      buildGrid();
    }
  
    // Function to delete the last column (if more than one column exists)
    function deleteColumn() {
      if (numCols > 1) {
        // Remove data for each cell in the last column:
        for (let r = 1; r <= numRows; r++) {
          const cellId = String.fromCharCode(65 + numCols - 1) + r;
          delete cellData[cellId];
        }
        numCols--;
        buildGrid();
      } else {
        alert("Cannot delete the last column!");
      }
    }
  
    // Attach event listeners to the Add/Delete row/column buttons
    document.getElementById("add-row").addEventListener("click", addRow);
    document.getElementById("delete-row").addEventListener("click", deleteRow);
    document.getElementById("add-column").addEventListener("click", addColumn);
    document.getElementById("delete-column").addEventListener("click", deleteColumn);
  
    // Initially build the grid when the page loads
    buildGrid();
  });
  