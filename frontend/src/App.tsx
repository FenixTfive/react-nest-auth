import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./navigation/routes";
import AuthenticationContextProvider from "./ApiContext/AuthenticationContext";
import ApiConnectorContextProvider from "./ApiContext/ApiConnectorContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthenticationContextProvider>
        <ApiConnectorContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ApiConnectorContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
