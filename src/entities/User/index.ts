import { initAuthData } from './model/services/initAuthData';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { userActions, userReducer } from './model/slice/userSlice';
import {
  getUserRoles,
  isUserAdmin,
  isUserManager,
} from './model/selectors/roleSelectors';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInitiated } from './model/selectors/getUserInitiated/getUserInitiated';
import { useJsonSettings } from './model/selectors/jsonSettings';
import { getUserDataByIdQuery } from './api/userApi';

import { UserRole } from './model/consts/userConsts';
import { UserSchema, User } from './model/types/user';

export {
  initAuthData,
  saveJsonSettings,
  userActions,
  userReducer,
  getUserRoles,
  isUserAdmin,
  isUserManager,
  getUserAuthData,
  getUserInitiated,
  useJsonSettings,
  UserRole,
  getUserDataByIdQuery,
};

export type { UserSchema, User };
