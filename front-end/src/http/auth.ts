import { SigninOptions } from 'interfaces/auth-provider.interface';

const authProvider = {
  login(options: SigninOptions) {
    const { userState } = options;

    userState.isAuthenticated = true;

    localStorage.setItem('@ApiBot:userData', JSON.stringify({ userState }));

    return userState;
  }
};

export { authProvider };
