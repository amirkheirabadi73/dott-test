import * as matrixLib from './libs/matrix';
import prompt from './libs/input';

export default async function app(): Promise<void> {
  // Get the inputs and calculate the count of lines based on count of test cases
  const inputLines: string[] = await prompt();

  let lineCounter = 1;

  // Build and calculate the matrix for each test case
  for (let testCaseIndex = 0; testCaseIndex < +inputLines[0]; testCaseIndex += 1) {
    lineCounter = matrixLib.buildMatrix(inputLines, lineCounter);
  }
}
