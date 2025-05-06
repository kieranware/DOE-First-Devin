import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { AuthState, User } from '../types';

const mockAuthService = {
  login: async () => {
    return {
      userId: 'user-123',
      name: 'Sarah O\'Connor',
      email: 'sarah.oconnor@education.ie',
      token: 'mock-jwt-token',
      instances: ['primary', 'post-primary'], // For multi-instance testing
      roles: ['teacher']
    };
  },
  getToken: () => 'mock-jwt-token',
  isAuthenticated: () => true,
  logout: async () => { /* mock logout */ }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  activeInstance: null
};

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_ACTIVE_INSTANCE'; payload: string };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        activeInstance: action.payload.user.instances[0] // Default to first instance
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    case 'SET_ACTIVE_INSTANCE':
      return {
        ...state,
        activeInstance: action.payload
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: () => Promise<void>;
  logout: () => void;
  setActiveInstance: (instanceId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    if (!autoLoginAttempted && !state.isAuthenticated) {
      const autoLogin = async () => {
        try {
          console.log('Attempting auto-login');
          
          const userData = await mockAuthService.login();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: {
                userId: userData.userId,
                name: userData.name,
                email: userData.email,
                instances: userData.instances,
                roles: userData.roles
              },
              token: userData.token
            }
          });
        } catch (error) {
          console.error('Auto-login failed:', error);
        } finally {
          setAutoLoginAttempted(true);
        }
      };

      autoLogin();
    }
  }, []);

  const login = async () => {
    try {
      const userData = await mockAuthService.login();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            userId: userData.userId,
            name: userData.name,
            email: userData.email,
            instances: userData.instances,
            roles: userData.roles
          },
          token: userData.token
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setActiveInstance = (instanceId: string) => {
    dispatch({ type: 'SET_ACTIVE_INSTANCE', payload: instanceId });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, setActiveInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
