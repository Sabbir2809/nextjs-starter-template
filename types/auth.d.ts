interface IAuthContext {
  isLoading: boolean;
  auth?: IAuth;
  updateAuth: (auth: IAuth) => void;
  login: (mobileNumber: string, password: string) => void;
  register: (data: object) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

interface IAuth {
  name: string;
  email: string;
  type: string;
}

