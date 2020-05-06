import { User } from '../../users/users.entity';

export type SignInDto = Pick<User, 'email' | 'username' | 'uid' | 'password'>;
