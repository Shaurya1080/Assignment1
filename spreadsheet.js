document.addEventListener("DOMContentLoaded", function () {
    const DEFAULT_ROWS = 10;
    const DEFAULT_COLS = 10;
    let numRows = DEFAULT_ROWS;
    let numCols = DEFAULT_COLS;
    const spreadsheetContainer = document.getElementById("spreadsheet-container");
  
    // Storage for cell data: key is a cell ID (e.g., 'A1'), value is raw text or a formula string.
    let cellData = {};
    let selectedCellId = null;
  
    // Build the initial grid
    function buildGrid() {
      spreadsheetContainer.innerHTML = "";
      const table = document.createElement("table");
  
      // Create column headers (first row)
      let headerRow = document.createElement("tr");
      let cornerTh = document.createElement("th");
      headerRow.appendChild(cornerTh);
      for (let c = 0; c < numCols; c++) {
        let th = document.createElement("th");
        th.innerText = String.fromCharCode(65 + c); // Column letters (A, B, C, ...)
        headerRow.appendChild(th);
      }
      table.appendChild(headerRow);
  
      // Create data rows with cells
      for (let r = 1; r <= numRows; r++) {
        let tr = document.createElement("tr");
  
        // Row header
        let th = document.createElement("th");
        th.innerText = r; // Row numbers (1, 2, 3, ...)
        tr.appendChild(th);
  
        for (let c = 0; c < numCols; c++) {
          let td = document.createElement("td");
          let cellId = String.fromCharCode(65 + c) + r; // Cell ID (e.g., A1, B2)
          if (!(cellId in cellData)) {
            cellData[cellId] = ""; // Initialize cell data
          }
  
          // Create input element for editing the cell’s content
          let input = document.createElement("input");
          input.type = "text";
          input.value = cellData[cellId];
          input.dataset.cellId = cellId;
          input.classList.add("cell-input");
  
          // When a cell gains focus, update the formula bar and mark it as selected
          input.addEventListener("focus", function () {
            removeCellSelection();
            selectedCellId = cellId;
            td.classList.add("selected");
            document.getElementById("formula-bar").value = cellData[cellId];
          });
  
          // On pressing Enter, save the value and move to the next row
          input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
              event.preventDefault(); // Prevent default form submission behavior
              saveCellValue(input); // Save the current value
  
              // Move focus to the next row in the same column
              let match = cellId.match(/^([A-Z]+)(\d+)$/); // Extract column and row from cell ID
              if (match) {
                let colLetters = match[1];
                let currentRow = parseInt(match[2]);
                let nextRow = currentRow + 1;
  
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
  
    // Save the value of a cell into `cellData`
    function saveCellValue(input) {
      const cellId = input.dataset.cellId;
      if (cellId) {
        cellData[cellId] = input.value;
        recalcCells(); // Recalculate formulas if needed
      }
    }
  
    // Remove "selected" styling from all cells
    function removeCellSelection() {
      document.querySelectorAll(".selected").forEach((td) => td.classList.remove("selected"));
    }
  
    // Recalculate cells containing formulas (those starting with "=")
    function recalcCells() {
      for (let cellId in cellData) {
        let value = cellData[cellId];
        if (typeof value === "string" && value.startsWith("=")) {
          const result = evaluateFormula(value, cellData);
          const inputElement = document.querySelector(`input[data-cell-id="${cellId}"]`);
          if (inputElement) {
            inputElement.value = result; // Update displayed value
          }
        }
      }
    }
  
    // Formula evaluation logic (basic implementation)
    function evaluateFormula(formula, data) {
      try {
        const trimmedFormula = formula.slice(1).trim(); // Remove "=" sign
        const fnMatch = trimmedFormula.match(/^(\w+)\((.*)\)$/); // Match function name and arguments
  
        if (!fnMatch) return "ERROR"; // Invalid formula syntax
  
        const fnName = fnMatch[1].toLowerCase();
        const argsStr = fnMatch[2];
        const argsList = argsStr.split(",").map((arg) => arg.trim());
  
        const values = argsList.map((arg) => parseFloat(data[arg]) || 0); // Get values from `cellData`
        
        switch (fnName) {
          case "sum":
            return values.reduce((acc, val) => acc + val, 0);
          case "average":
            return values.reduce((acc, val) => acc + val, 0) / values.length || "N/A";
          case "max":
            return Math.max(...values);
          case "min":
            return Math.min(...values);
          case "count":
            return values.filter((val) => !isNaN(val)).length;
          default:
            return "UNKNOWN FUNCTION";
        }
      } catch (error) {
        return "ERROR";
      }
    }
  
    // Build initial grid on page load
    buildGrid();
  });

  


  //P1