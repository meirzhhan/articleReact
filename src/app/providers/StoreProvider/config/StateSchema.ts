import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { loginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  loginForm: loginSchema;
}
