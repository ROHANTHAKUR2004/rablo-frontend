export interface authState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userinfo: IUser | null;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
