

export function cleanStructure(structure: string): string {
  // Split the structure into lines
  const lines = structure.split('\n');

  // Remove leading and trailing whitespace from each line
  const trimmedLines = lines.map(line => line.trim());

  // Remove empty lines
  const nonEmptyLines = trimmedLines.filter(line => line.length > 0);

  // Join the cleaned lines back into a single string
  return nonEmptyLines.join('\n');
}
