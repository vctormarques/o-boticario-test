import { UserAuthState } from "./user-auth-state.interface";

export interface SigninOptions {
    userState: UserAuthState;
    callback: VoidFunction
}

export interface AuthContextInterface {
    userState: UserAuthState;
    signin: (options: SigninOptions) => void;
    signout: (callback: VoidFunction) => void;
    loading: boolean;
}