export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
  cl: string,
  mods: Mods = {},
  additional: Array<string | undefined>,
): string {
  return [
    cl,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}

// classNames('remove-btn', { hovered: true, selectable: true, red: false }, ['pdg']);
// ('remove-btn pdg hovered selectable');
