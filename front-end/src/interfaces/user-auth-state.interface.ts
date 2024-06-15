import { User } from "./user.interface";

export interface UserAuthState {
    acess_token: string;
    expiresIn: number;
    tokenType: string;
    user: User;
    isAuthenticated: boolean;

}