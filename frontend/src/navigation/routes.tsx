import MainLayout from "../layouts/MainLayout";
import LoginLayout from "../layouts/LoginLayout";
import {
  createBrowserRouter,
  Route,
  Navigate,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";

const Home: React.FC = () => {
  return <div>Home Page</div>;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <MainLayout>
            <PrivateRoutes />
          </MainLayout>
        }
      >
        <Route path="/">
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Home />} />
        </Route>
      </Route>
      <Route
        element={
          <LoginLayout>
            <Outlet />
          </LoginLayout>
        }
      >
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  )
);
