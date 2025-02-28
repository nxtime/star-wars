import { createContext, FC, PropsWithChildren, useReducer } from "react";

import { authReducer } from "../reducers/auth-reducer.reducer";
import { AuthActionType, AuthLoginDto, AuthState } from "../models/auth.model";
import { UserStatus, User, UserCredentials } from "../models/user.model";

import { Theme } from "@/models/theme.model";

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

      // const { data } = await api.get<AuthLoginDto>("/login");
      //
      const data: AuthLoginDto = {
        user: {
          email: "marcos@email.com",
          createdAt: new Date(),
          firstName: "Marcos",
          language: "en",
          lastName: "Paulo",
          username: "nxtime",
          social: {},
          notifications: {
            email: false,
            desktop: false,
            push: false
          },
          status: UserStatus.ACTIVE,
          theme: Theme.SYSTEM,
          timezone: "BRZ",
          id: "23123213",
          updatedAt: new Date()
        }
      }

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
