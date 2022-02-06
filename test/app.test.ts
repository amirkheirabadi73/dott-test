import app from '../src/app';
import * as InputLib from '../src/libs/input';
import * as MatrixLib from '../src/libs/matrix';

describe('Prompt inputs', () => {
  it('Run the app with sample input', async () => {
    const spyPrompt = jest.spyOn(InputLib, 'default');
    const spyBuildMatrix = jest.spyOn(MatrixLib, 'buildMatrix');

    spyPrompt.mockImplementationOnce(() =>
      Promise.resolve(['2', '2 2', '00', '01', '', '00', '01'])
    );

    await app();

    expect(spyPrompt).toBeCalledTimes(1);
    expect(spyBuildMatrix).toBeCalledTimes(2);
  });
});
