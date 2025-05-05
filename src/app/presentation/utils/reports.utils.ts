export function generateCsv( data : any) {
  const headers = Object.keys(data[0]).join(';');
  const rows = data.map((row: any) => Object.values(row).join(';')).join('\n');
  return `${headers}\n${rows}`;
}


export function downloadCSV(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

