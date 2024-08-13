import { customCl } from './useClassName';
// import { classNames } from 'shared/lib/useClassName';

describe('classNames', () => {
  test('only first param', () => {
    expect(customCl('someClass', {}, [])).toBe('someClass');
  });

  test('additional class', () => {
    const expected = 'someClass class1 class2';
    expect(customCl('someClass', {}, ['class1', 'class2'])).toBe(expected);
  });

  test('with mods', () => {
    const expected = 'someClass class1 class2 hovered scrollable';
    expect(
      customCl('someClass', { hovered: true, scrollable: true }, [
        'class1',
        'class2',
      ]),
    ).toBe(expected);
  });

  test('with mods false', () => {
    const expected = 'someClass class1 class2 hovered';
    expect(
      customCl(
        'someClass',
        { hovered: true, scrollable: false, selectable: false },
        ['class1', 'class2'],
      ),
    ).toBe(expected);
  });
});
