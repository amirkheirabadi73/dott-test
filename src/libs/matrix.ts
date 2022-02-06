import { MAX_LENGTH_OF_MATRIX } from '../const';

/**
 * Prints a matrix to the console.
 * @param  {number[][]} matrix
 * @param  {} rows
 * @param  {} cols
 * @returns void
 */
export function printMatrix(matrix: number[], rows, cols): void {
  console.log('----------------------------------------');
  console.log('----------------------------------------');
  let breakCol = 1;
  let line = '';
  for (let index = 1; index <= rows * cols + 1; index += 1) {
    line += `${matrix[index]} `;
    if (breakCol % cols === 0) {
      console.log(line);
      line = '';
    }

    breakCol += 1;
  }
}

/**
 * Builds a matrix from the input lines.
 * @param  {} row
 * @param  {} col
 */
export function createGraph(row: number, col: number): number[][] {
  const graph: number[][] = [...new Array(MAX_LENGTH_OF_MATRIX * MAX_LENGTH_OF_MATRIX)].map(
    () => []
  );
  let level = 1;
  for (let rowIndex = 1; rowIndex <= row; rowIndex += 1) {
    for (let colIndex = 1; colIndex <= col; colIndex += 1) {
      if (rowIndex === row) {
        if (colIndex !== col) {
          graph[level].push(level + 1);
          graph[level + 1].push(level);
        }
      } else if (colIndex === col) {
        graph[level].push(level + col);
        graph[level + col].push(level);
      } else {
        graph[level].push(level + 1);
        graph[level + 1].push(level);
        graph[level].push(level + col);
        graph[level + col].push(level);
      }

      level += 1;
    }
  }

  return graph;
}
/**
 * Find the minimum distance between two nodes in a graph.
 * @param  {number[]} visit
 * @param  {number[]} dist
 * @param  {number[]} queue
 * @param  {number[][]} graph
 * @returns number
 */
export function bfs(
  visitedNode: number[],
  distances: number[],
  queue: number[],
  graph: number[][]
): number[] {
  while (queue.length > 0) {
    const temp = queue.shift();
    graph[temp].forEach((item) => {
      if (visitedNode[item] !== 1) {
        distances[item] = Math.min(distances[item], distances[temp] + 1);
        queue.push(item);
        visitedNode[item] = 1;
      }
    });
  }

  return distances;
}

/**
 * @param  {string[]} inputLines
 * @param  {number} lineCounter
 * @returns number
 */
export function buildMatrix(inputLines: string[], lineCounter: number): number {
  // Build the matrix and solve the problem for each test case

  // Get the start and end locations
  const [rows, cols] = inputLines[lineCounter].split(' ').map(Number);
  lineCounter += 1;

  const matrix = inputLines
    .slice(lineCounter, lineCounter + rows)
    .map((item) => item.split('').map(Number));

  const graph = createGraph(rows, cols);

  let distances = new Array(MAX_LENGTH_OF_MATRIX * MAX_LENGTH_OF_MATRIX).fill(0);
  const visitedNode = new Array(MAX_LENGTH_OF_MATRIX * MAX_LENGTH_OF_MATRIX).fill(0);

  for (let index = 0; index < distances.length; index += 1) {
    distances[index] = 10 ** 10;
    visitedNode[index] = 0;
  }

  let level = 1;
  const queue = [];

  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (matrix[i][j] === 1) {
        distances[level] = 0;
        queue.push(level);
        visitedNode[level] = 1;
      }
      level += 1;
    }
  }

  distances = bfs(visitedNode, distances, queue, graph);

  lineCounter += rows + 1; // Add 1 to skip the line break

  printMatrix(distances, rows, cols);

  return lineCounter;
}
