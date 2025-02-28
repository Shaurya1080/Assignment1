// ================================
// Mathematical Functions
// ================================

function sum(values) {
    return values.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
  }
  
  function average(values) {
    const numericValues = values.map(Number).filter(n => !isNaN(n));
    return numericValues.length ? sum(numericValues) / numericValues.length : 0;
  }
  
  function max(values) {
    return Math.max(...values.map(Number).filter(n => !isNaN(n)));
  }
  
  function min(values) {
    return Math.min(...values.map(Number).filter(n => !isNaN(n)));
  }
  
  function count(values) {
    return values.filter(val => !isNaN(parseFloat(val))).length;
  }
  
  // ================================
  // Data Quality Functions
  // ================================
  
  function trim(text) {
    return text.trim();
  }
  
  function upper(text) {
    return text.toUpperCase();
  }
  
  function lower(text) {
    return text.toLowerCase();
  }
  
  function removeDuplicates(rows) {
    let seen = new Set();
    return rows.filter(row => {
      let key = row.join(",");
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
  
  function findAndReplace(text, findStr, replaceStr) {
    return text.replace(new RegExp(findStr, 'g'), replaceStr);
  }
  
  // ================================
  // Advanced Formula Evaluator
  // ================================
  // Supports formulas like: =sum(A1,B1,C1) and includes basic support for absolute ($A$1) and relative references.
  function evaluateFormula(formula, cellData) {
    // Remove the '=' sign and trim
    let trimmed = formula.substring(1).trim();
  
    // Regular expression to extract the function name and parameter list.
    // This regex works even if there are spaces between parameters.
    let matches = trimmed.match(/^(\w+)\(([\w\$,;\s]+)\)$/);
    if (!matches) {
      return "ERROR";
    }
  
    let fnName = matches[1].toLowerCase();
    let params = matches[2].split(/[,;\s]+/).filter(p => p !== "");
  
    // Support for direct numeric conversion of parameters if they are not cell references.
    let values = params.map(param => {
      // Remove any absolute reference markers ($)
      let cellId = param.replace(/\$/g, '');
      return cellData[cellId] || param;
    });
  
    // Dispatch function based on name.
    switch (fnName) {
      case "sum":
        return sum(values);
      case "average":
        return average(values);
      case "max":
        return max(values);
      case "min":
        return min(values);
      case "count":
        return count(values);
      case "trim":
        return values.map(v => trim(v)).join(" ");
      case "upper":
        return values.map(v => upper(v)).join(" ");
      case "lower":
        return values.map(v => lower(v)).join(" ");
      default:
        return "UNKNOWN FUNCTION";
    }
  }

  //P1  