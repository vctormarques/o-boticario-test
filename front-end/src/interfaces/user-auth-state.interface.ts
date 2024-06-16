import { User } from "./user.interface";

export interface UserAuthState {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    user: User;
    isAuthenticated: boolean;

}