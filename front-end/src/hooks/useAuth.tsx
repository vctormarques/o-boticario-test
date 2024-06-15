import React from "react";
import { UserAuthContext } from "store/auth.context";

export default function useAuth() {
    return React.useContext(UserAuthContext)
}