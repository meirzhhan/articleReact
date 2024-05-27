export type ScrollSchema = Record<string, number>; // 1 - address of url, 2 - position of scroll

export interface UISchema {
  scroll: ScrollSchema;
}
