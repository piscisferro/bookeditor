
import { Authority } from './authority';

export class UserBase {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  enabled: boolean;
  accountExpired: boolean;
  accountLocked: boolean;
  passwordExpired: boolean;

  roles: Array<Authority>;

  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
