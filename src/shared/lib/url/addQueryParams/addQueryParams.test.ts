import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      search: 'value',
    });

    expect(params).toBe('?search=value');
  });
  test('test with many params', () => {
    const params = getQueryParams({
      search: 'value',
      example: 'word',
    });

    expect(params).toBe('?search=value&example=word');
  });
  test('test with undef', () => {
    const params = getQueryParams({
      search: 'value',
      example: undefined,
    });

    expect(params).toBe('?search=value');
  });
});
