import * as Silly from '../src/config/index';

const { log_level } = jest.requireActual<typeof Silly>('../silly');

describe('silly function', () => {
  test('guaranteed random', () => {
    expect(log_level.alert).toBe(4);
  });
});
