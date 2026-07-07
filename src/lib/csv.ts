export type SheetRow = Record<string, string>;

export function parseCsv(input: string): SheetRow[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      currentCell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
      continue;
    }

    currentCell += char;
  }

  currentRow.push(currentCell);
  rows.push(currentRow);

  const [headers = [], ...dataRows] = rows.filter((row) => row.some((cell) => cell.trim()));
  const normalizedHeaders = headers.map((header) => normalizeKey(header));

  return dataRows.map((row) =>
    normalizedHeaders.reduce<SheetRow>((result, header, index) => {
      if (header) {
        result[header] = (row[index] ?? "").trim();
      }

      return result;
    }, {})
  );
}

export function normalizeKey(value: string) {
  return value.trim().replace(/^\uFEFF/, "");
}
