import React, {useRef, useState} from "react";
import "./DataControls.css";

const EXPORT_COLUMNS = ["id", "title", "amount", "date"];
const REQUIRED_IMPORT_COLUMNS = ["title", "amount", "date"];

const escapeCsvValue = value => {
  if (value === null || value === undefined) {
    return "";
  }
  const stringValue = String(value);
  if (/,|\n|"/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

const buildCsvContent = expenses => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return "";
  }

  const headerRow = EXPORT_COLUMNS.join(",");
  const dataRows = expenses.map(expense => {
    const formattedDate = expense.date instanceof Date ? expense.date.toISOString() : new Date(expense.date).toISOString();
    return [
      escapeCsvValue(expense.id),
      escapeCsvValue(expense.title),
      escapeCsvValue(expense.amount),
      escapeCsvValue(formattedDate)
    ].join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

const detectDelimiter = line => {
  if (line.includes("\t")) {
    return "\t";
  }
  return ",";
};

const splitCsvLine = (line, delimiter) => {
  const values = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        currentValue += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === delimiter && !insideQuotes) {
      values.push(currentValue);
      currentValue = "";
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue);
  return values.map(value => value.trim());
};

const stripBom = text => text.replace(/^\uFEFF/, "");

const parseCsvExpenses = text => {
  const normalizedText = stripBom(text);
  const lines = normalizedText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) {
    return [];
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = splitCsvLine(lines[0], delimiter).map(header => header.toLowerCase());
  const columnIndexes = {};

  REQUIRED_IMPORT_COLUMNS.forEach(columnName => {
    const index = headers.indexOf(columnName);
    if (index === -1) {
      throw new Error(`Missing column "${columnName}"`);
    }
    columnIndexes[columnName] = index;
  });

  if (headers.includes("id")) {
    columnIndexes.id = headers.indexOf("id");
  }

  const expenses = [];
  for (let i = 1; i < lines.length; i++) {
    const values = splitCsvLine(lines[i], delimiter);
    if (values.length === 1 && values[0] === "") {
      continue;
    }

    const idValue = columnIndexes.id !== undefined ? values[columnIndexes.id] : undefined;
    const titleValue = values[columnIndexes.title];
    const amountValue = parseFloat(values[columnIndexes.amount]);
    const dateValue = new Date(values[columnIndexes.date]);

    if (!titleValue || Number.isNaN(amountValue) || Number.isNaN(dateValue.getTime())) {
      throw new Error(`Invalid data on line ${i + 1}`);
    }

    expenses.push({
      id: idValue,
      title: titleValue,
      amount: amountValue,
      date: dateValue
    });
  }

  return expenses;
};

const DataControls = ({expenses, onImportExpenses}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleExportClick = () => {
    if (!expenses || expenses.length === 0) {
      window.alert("No expenses to export yet.");
      return;
    }

    try {
      const csvContent = buildCsvContent(expenses);
      if (!csvContent) {
        window.alert("Unable to generate CSV content.");
        return;
      }

      const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `expenses-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export CSV:", error);
      window.alert("Unable to export CSV. Please try again.");
    }
  };

  const processFile = file => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = loadEvent => {
      try {
        const text = loadEvent.target?.result;
        if (typeof text !== "string") {
          throw new Error("File contents could not be read.");
        }
        const parsedExpenses = parseCsvExpenses(text);
        if (parsedExpenses.length === 0) {
          window.alert("The selected CSV file did not contain any expenses.");
          return;
        }
        onImportExpenses(parsedExpenses);
        window.alert(`Imported ${parsedExpenses.length} expenses from CSV.`);
      } catch (error) {
        console.error("CSV import failed:", error);
        window.alert(`Unable to import CSV: ${error.message}`);
      }
    };

    reader.onerror = () => {
      console.error("CSV import failed: unable to read file.");
      window.alert("Unable to read the selected file.");
    };

    reader.readAsText(file);
  };

  const handleFileChange = event => {
    const file = event.target.files && event.target.files[0];
    processFile(file);
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDrop = event => {
    event.preventDefault();
    setIsDragging(false);
    if (!event.dataTransfer?.files || event.dataTransfer.files.length === 0) {
      return;
    }
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const handleDragEnter = event => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDragLeave = event => {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsDragging(false);
  };

  return (
    <div className="data-controls">
      <h3>Data Management</h3>
      <p className="data-controls__helper-text">Import from or export to CSV to back up your expenses.</p>
      <div className="data-controls__buttons">
        <label
          htmlFor="data-controls-file-input"
          className={`data-controls__dropzone ${isDragging ? "data-controls__dropzone--active" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <strong>Import File</strong>
          <span>Drag & drop</span>
        </label>
        <button type="button" onClick={handleExportClick} disabled={!expenses || expenses.length === 0}>Export CSV</button>
      </div>
      <input
        id="data-controls-file-input"
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="data-controls__file-input-hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DataControls;
