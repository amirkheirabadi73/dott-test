import * as matrixLib from '../src/libs/matrix';

global.console.log = jest.fn();

describe('Matrix - printMatrix', () => {
  beforeEach(() => {
    matrixLib.printMatrix([0, 1, 2, 3, 4], 2, 2);
  });

  it('Print a sample matrix', () => {
    expect(console.log).toHaveBeenCalledWith('1 2 ');
    expect(console.log).toHaveBeenCalledWith('3 4 ');
  });
});

describe('Matrix - createGraph', () => {
  const graph = matrixLib.createGraph(2, 2);

  console.log({ graph });
  it('Create a simple graph', () => {
    expect(graph[5]).toEqual([]);
    expect(graph[1]).toEqual([2, 3]);
    expect(graph[4]).toEqual([2, 3]);
  });
});

describe('Matrix - bfs', () => {
  const distances = [
    10000000000, 10000000000, 10000000000, 10000000000, 0, 10000000000, 1000000000.1, 10000000000,
    10000000000,
  ];
  const visitedNode = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
  const queue = [4];
  const graph = [[], [2, 3], [1, 4], [1, 4], [2, 3], [], [], [], [], [], []];

  it('‌Check result of bfs', () => {
    const results = matrixLib.bfs(visitedNode, distances, queue, graph);
    expect(results[1]).toBe(2);
    expect(results[4]).toBe(0);
  });
});

describe('Matrix - buildMatrix', () => {
  const matrixSampleData = ['1', '2 2', '00', '01'];
  const spyPrintMatrix = jest.spyOn(matrixLib, 'printMatrix');

  it('‌Build a sample matrix', () => {
    const lineCounter = matrixLib.buildMatrix(matrixSampleData, 1);
    expect(lineCounter).toBe(5);
    expect(spyPrintMatrix).toBeCalledTimes(1);
    expect(spyPrintMatrix).toHaveBeenCalledWith(expect.anything(), 2, 2);
  });
});
