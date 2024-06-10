import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';
import { ProfileSchema } from '../../types/editableProfileCardSchema';

describe('getProfileReadonly.test', () => {
  test('should return readonly', () => {
    const state: Partial<StateSchema> = {
      profile: {
        readonly: true,
      } as ProfileSchema,
    };

    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: Partial<StateSchema> = {};
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
  });
});
