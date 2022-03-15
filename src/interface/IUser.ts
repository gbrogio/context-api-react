import { User } from 'firebase/auth';

export interface IUser {
  name: string,
  email: string,
  photo: string,
  uid: string
}
export type UserService = User
