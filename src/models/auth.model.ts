import type { User } from "./user.model";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type ActionMap<M> = {
  [Key in keyof M]: M[Key] extends undefined
  ? { type: Key }
  : { type: Key; payload: M[Key] }
};

export const enum AuthActionType {
  LOGIN_START = "login start",
  LOGIN_SUCCESS = "login success",
  LOGIN_FAILURE = "login failure",
  LOGOUT = "logout",
  UPDATE_USER = "update user"
}

type AuthPayload = {
  [AuthActionType.LOGIN_START]: undefined;
  [AuthActionType.LOGIN_SUCCESS]: User;
  [AuthActionType.LOGIN_FAILURE]: string;
  [AuthActionType.LOGOUT]: undefined;
  [AuthActionType.UPDATE_USER]: Partial<User>;
}

export type AuthLoginDto = {
  user: User;
}

export type AuthAction = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
