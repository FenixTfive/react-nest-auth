import React from "react";
import { useAuth } from "../ApiContext/AuthenticationContext";

const Home: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated() ? (
        <>
          <p>Welcome back!</p>
          <button
            onClick={logout}
            className="btn btn-primary cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
};

export default Home;
