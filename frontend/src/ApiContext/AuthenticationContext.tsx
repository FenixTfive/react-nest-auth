import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  apiConnector?: string; // Based on usage in localStorage JSON.stringify
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

interface AuthContextType extends AuthState {
  login: (data: { accessToken: string | null; user: User | null }) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

const getInitialState = () => {
  const authCtx = localStorage.getItem("authCtx");
  return authCtx ? JSON.parse(authCtx) : initialState;
};

interface AuthenticationContextProviderProps {
  children: React.ReactNode;
}

const AuthenticationContextProvider: React.FC<
  AuthenticationContextProviderProps
> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(getInitialState);

  const storeAuthInLocalStorage = (authState: AuthState) => {
    localStorage.setItem(
      "authCtx",
      JSON.stringify({
        apiConnector: JSON.stringify(authState.apiConnector),
        ...authState,
      })
    );
  };

  useEffect(() => {
    storeAuthInLocalStorage(auth);
  }, [auth]);

  const login = (data: {
    accessToken: string | null;
    user: User | null;
  }): void => {
    setAuth((prev) => ({
      ...prev,
      accessToken: data.accessToken,
      user: data.user,
    }));
  };

  const logout = (): void => {
    sessionStorage.clear();
    localStorage.removeItem("authCtx");
    setAuth(initialState);
  };

  const isAuthenticated = (): boolean => {
    return auth.accessToken !== null;
  };

  const contextValue: AuthContextType = {
    ...auth,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthenticationContextProvider"
    );
  }
  return context;
};

export default AuthenticationContextProvider;
