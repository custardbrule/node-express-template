describe('silly function', () => {
  test('guaranteed random', () => {
    const str = 'asdasd';
    expect(str).not.toContain('q');
  });
});
