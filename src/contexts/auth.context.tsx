import axios from "axios";
import { createContext, FC, PropsWithChildren, useReducer } from "react";
import { authReducer } from "../reducers/auth-reducer.reducer";
import { AuthActionType, AuthLoginDto, AuthState } from "../models/auth.model";
import type { User, UserCredentials } from "../models/user.model";

interface AuthContextType extends AuthState {
  login(credentials: { email: string; password: string }): Promise<void>;
  logout(): void;
  updateUser(updates: Partial<User>): void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: UserCredentials) => {
    try {
      dispatch({ type: AuthActionType.LOGIN_START });

      const isLoginValid = credentials.email === "admin@email.com" && !!credentials.password;
      if (!isLoginValid) throw new Error("Login Invalid!");

      const { data } = await axios.get<AuthLoginDto>("/login");

      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data.user
      });
    } catch (error) {
      dispatch({
        type: AuthActionType.LOGIN_FAILURE,
        payload: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };

  const logout = () => {
    dispatch({ type: AuthActionType.LOGOUT });
  };

  const updateUser = (updates: Partial<User>) => {
    dispatch({
      type: AuthActionType.UPDATE_USER,
      payload: updates
    });
  };

  const actions = {
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        ...actions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
