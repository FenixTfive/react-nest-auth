import React from "react";
import { LayoutProps } from "./interfaces";

const LoginLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow mt-0 transition-all duration-200 ease-in-out">
        <div className="pb-0 pt-0 h-full min-h-screen items-start p-0 relative overflow-hidden flex bg-cover bg-center">
          {/* <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-60 bg-gradient-to-tl from-zinc-800 to-zinc-700" /> */}
          {props.children}
        </div>
      </main>
      <footer className="absolute z-10 bottom-0 left-0 right-0">
        fenix all rights reserved
      </footer>
    </div>
  );
};

export default LoginLayout;
