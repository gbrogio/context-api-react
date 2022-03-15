import { IUser } from './IUser';

export interface IAuthContext {
  signInGoogle: () => Promise<void>;
  isUser: IUser;
  signOut: () => Promise<void>;
}
