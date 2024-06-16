import React from 'react';
import { authProvider } from 'http/auth';
import {
  AuthContextInterface,
  SigninOptions
} from 'interfaces/auth-provider.interface';
import { UserAuthState } from 'interfaces/user-auth-state.interface';

const INITIAL_STATE: UserAuthState = {
  accessToken: '',
  expiresIn: 3600,
  tokenType: '',
  user: {
    nome: '',
    username: '',
  },
  isAuthenticated: false
};

export const UserAuthContext = React.createContext({} as AuthContextInterface);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [userState, setUserState] = React.useState(INITIAL_STATE);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const storageUserData = localStorage.getItem('@ApiBot:userData');
    if (storageUserData) {
      const storageUserDataJSON = JSON.parse(storageUserData);
      setUserState(storageUserDataJSON.userState);
    }
    setLoading(false);
  }, []);

  const signin = (options: SigninOptions) => {
    const userData = authProvider.login(options);
    setUserState(userData);
    options.callback();
  };

  const signout = (callback: VoidFunction) => {
    authProvider.logout();
    setUserState(INITIAL_STATE);
    callback();
  }

  const memoedValue = React.useMemo(
    () => ({
      userState,
      signin,
      signout,
      loading
    }),
    [userState, loading]
  );

  return (
    <UserAuthContext.Provider value={memoedValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default AuthContextProvider;
