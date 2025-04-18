interface IAuth {
  name: string;
  email: string;
  phone: string;
  type: string;
  isPhoneVerified: boolean;
}

interface ILoginPayload {
  phone: string;
  password: string;
}

interface IAuthContext {
  isLoading: boolean;
  auth?: IAuth;
  registration: (data: IAuth) => Promise<void>;
  login: (data: ILoginPayload) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
