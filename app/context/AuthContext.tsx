import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../services/authService';
import { saveToken, loadToken, removeToken } from '../services/tokenService';
import { setLogoutHandler } from '../services/authEvents';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (name: string, email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = await loadToken();

      setAuthState({
        token: token ?? null,
        authenticated: !!token,
      });
    };

    initAuth();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      return await registerRequest(name, email, password);
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.data?.message || 'Something went wrong',
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await loginRequest(email, password);

      const token = result.data.access_token;

      await saveToken(token);

      setAuthState({
        token,
        authenticated: true,
      });

      return {
        token,
        user: result.data.user,
      };
    } catch (e) {
      return {
        error: true,
        msg: (e as any).response?.data?.message || 'Something went wrong',
      };
    }
  };

  const logout = async () => {
    await removeToken();

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
