import React, { createContext, useContext, useEffect } from "react";
import { ApiConnector } from "../ApiConnectorSDK";
import { useAuth } from "./AuthenticationContext";
import { IApiConnector } from "@/ApiConnectorSDK/apiConnector/interfaces/IApiConnector";

const apiConnectorInitialState = new ApiConnector({
  endpointUrl: import.meta.env.VITE_API_URL,
});

const ApiConnectorContext = createContext<IApiConnector>(
  apiConnectorInitialState
);

interface ApiConnectorContextProviderProps {
  children: React.ReactNode;
}

const ApiConnectorContextProvider: React.FC<
  ApiConnectorContextProviderProps
> = ({ children }) => {
  const auth = useAuth();
  if (auth.accessToken) {
    apiConnectorInitialState.setToken(auth.accessToken);
  }

  useEffect(() => {
    if (auth.accessToken) {
      apiConnectorInitialState.setToken(auth.accessToken);
    }
  }, [auth.accessToken]);

  return (
    <ApiConnectorContext.Provider value={apiConnectorInitialState}>
      {children}
    </ApiConnectorContext.Provider>
  );
};
export const useApiConnectorContext = (): IApiConnector =>
  useContext(ApiConnectorContext);
export default ApiConnectorContextProvider;
