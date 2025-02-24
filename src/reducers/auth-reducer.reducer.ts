import { AuthAction, AuthActionType, AuthState } from '@/models/auth.model';

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null
      };
    case AuthActionType.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action.payload
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    case AuthActionType.UPDATE_USER:
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    default:
      return state;
  }
};
