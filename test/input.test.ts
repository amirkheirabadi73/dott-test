import prompt from '../src/libs/input';
import readline from 'readline';

describe('Prompt inputs', () => {
  it('It should returen a array of string with 13 item', async () => {
    jest.spyOn(readline, 'createInterface').mockImplementationOnce(() => {
      return [
        '2',
        '3 4',
        '0001',
        '0011',
        '0011',
        '0110',
        '',
        '3 4',
        '0001',
        '0011',
        '0011',
        '0110',
        '',
        'wrong_data',
      ] as any;
    });
    const res = await prompt();

    expect(res).toHaveLength(13);
  });
});
