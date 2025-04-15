export interface IAuth {
  name: string;
  email: string;
  phone: string;
  type: string;
}

export interface IAuthContext {
  isLoading: boolean;
  auth?: IAuth;
  registration: (data: IAuth) => Promise<void>;
  login: (phone: string, password: string) => Promise<void>;
  updateAuth: (auth: IAuth) => void;
  refreshAuth: () => Promise<void>;
  logout: () => void;
}
