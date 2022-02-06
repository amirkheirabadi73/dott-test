import readline from 'readline';

/**
 * Get the inputs from the terminal
 * @returns string
 */
export default async function prompt(): Promise<string[]> {
  const inputLines: string[] = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let excpectedBreakLines = 0;

  console.log('Input multiple lines and press [Enter] to end.');
  for await (const line of rl) {
    if (!inputLines.length) excpectedBreakLines = +line;

    inputLines.push(line);

    // Break the loop if the number of lines is reached
    if (!line || line === '') {
      if (excpectedBreakLines > 1) {
        excpectedBreakLines -= 1;
      } else {
        break;
      }
    }
  }

  return inputLines;
}
