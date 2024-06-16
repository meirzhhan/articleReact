import { buildSelector } from '@/shared/lib/store';

// 1 - hook(uses in components), 2 - selector(can use in helpers, asyncThunk, ...)
export const [useCounterValue, getCounterValue] = buildSelector(
  (state) => state.counter.value,
);
